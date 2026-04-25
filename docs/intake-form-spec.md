# Claude Codeコンサル 事前ヒアリングフォーム 実装仕様

> 別の Claude Code セッションがこのドキュメント単体を読んで実装を完遂できる粒度で書かれています。
> 設計の経緯・意思決定の背景はすべてこのファイル内に含まれます。

## 0. ゴールとスコープ

### 何を作るか

「Claude Codeコンサル」(15万円/月 × 3ヶ月の1on1コンサルティング)の **事前ヒアリングフォーム**。受講者が契約後にURLを開いて20問に回答すると、回答内容が DB に保存され、Masa(運営者)に通知メールが届く。

### このフォームのジョブ

回答内容を見て、Masa が初回セッション(Week1)冒頭15分で:

1. 受講者向けに**カリキュラム叩き台**を提示できる(=パーソナライズ)
2. 後期Week9〜12で作る**MVP候補テーマ**が3つくらい見えている(=最終アウトプット先出し)

### v1 の前提

- 公開URL、認証なし、誰でも回答可能(URLは Masa が個別共有する想定)
- 日本語のみ(JP固定。en ロケールでも JP 内容を表示してOK)
- localStorage で途中保存(同一ブラウザでのみ復帰可)
- 完了後アクションは **Mailgun で Masa への通知メールのみ**(自動返信メール・Slack通知は v2)

## 1. アーキテクチャ

### URL 構造

```
/programs/claude-code/intake          フォーム本体(JP)
/programs/claude-code/intake/done     送信完了画面

/api/intake                             POST: Supabase insert + Mailgun
```

`localePrefix: 'as-needed'` のため `/programs/...` は ja(デフォルト)、`/en/programs/...` は en として解決される。**en でも同じJP内容を表示**(i18n対応は v2)。

### フロー

```
[回答者] /programs/claude-code/intake にアクセス
  ├ Section 1〜6 を順に回答
  ├ 入力中は localStorage で自動保存 (同ブラウザのみ復帰可)
  └ 送信ボタン
       └ POST /api/intake
            ├ Supabase: 1行 insert
            └ Mailgun → Masa: 全回答内容のHTMLメール
       → /programs/claude-code/intake/done へ遷移
            └ localStorage クリア
            └ 「2営業日以内にご連絡します」を表示
```

### 採用技術(全て既存依存内、追加は1つだけ)

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind + shadcn/ui (radix系すべて導入済み)
- react-hook-form + zod + @hookform/resolvers (既存)
- framer-motion (セクション切替アニメ用)
- sonner (toast、Toaster は `[locale]/layout.tsx` でマウント済み)
- mailgun.js + form-data (既存、`/api/contact` と同パターン)
- **Supabase JS client** ← 追加: `pnpm add @supabase/supabase-js`

### なぜこの構成か(主要意思決定の根拠)

| 決定事項   | 結論                                                  | 主な理由                                                       |
| ---------- | ----------------------------------------------------- | -------------------------------------------------------------- |
| 配信方法   | 自社サイト内製                                        | サービス自体のデモになる、データ自社蓄積、AI前処理(v2)の自由度 |
| URL        | 同一リポ + `app/[locale]/programs/claude-code/intake` | サブドメインは過剰、SEO/信頼感を集約、後で切り出し可能         |
| 認証       | なし(公開URL)                                         | v1は知人ベース運用でURL秘匿性で十分、最短で出すため            |
| DB         | Supabase                                              | 無料枠十分、将来コミュニティ/SaaS化で再利用、Vercel統合        |
| 途中保存   | localStorage                                          | 認証なしのため server-side draft 不可、UXは十分                |
| 完了通知   | Mailgun のみ                                          | v1 では Slack/自動返信を省略してシンプルに                     |
| ファイルUP | なし                                                  | Q17 PCスペックは文字入力で十分(画像は Week1 対面で確認)        |
| LP layout  | 標準ナビ/フッターを継承                               | route group での完全置換は工数大、v1 は標準で問題なし          |
| i18n       | JP のみ(en も JP 表示)                                | 対象が日本語話者、対応は v2                                    |

## 2. データモデル

### Supabase テーブル

```sql
create extension if not exists pgcrypto;

create table intake_submissions (
  id uuid primary key default gen_random_uuid(),

  -- セクション1: 基本情報
  full_name text not null,
  company text not null,
  role_business text not null,
  email text not null,
  preferred_contact text not null,           -- 'slack' | 'line' | 'email' | 'other'
  preferred_contact_other text,              -- preferred_contact='other' のとき

  -- セクション2: ゴール・動機
  goal_3months text not null,
  stance text not null,                      -- 'self' | 'deliver' | 'both'
  motivation text not null,

  -- セクション3: 業務・課題
  busy_tasks jsonb not null,                 -- string[3]: 必須3つ
  ai_experience text not null,
  ai_success_score int not null,             -- 1-5

  -- セクション4: 作りたいもの
  ideas jsonb not null,                      -- string[3..10]
  top_idea text not null,                    -- ideas のいずれか
  top_idea_reason text not null,
  outcome_description text not null,

  -- セクション5: スキル・環境
  programming_level text not null,           -- 'none' | 'html' | 'occasional' | 'daily'
  daily_tools jsonb not null,                -- string[]: 選択+その他
  daily_tools_other text,
  pc_os text not null,                       -- 'mac' | 'windows' | 'linux' | 'other'
  pc_os_other text,
  pc_admin text not null,                    -- 'full' | 'limited' | 'none'
  pc_spec text not null,
  existing_accounts jsonb not null,          -- string[]: 選択+その他
  existing_accounts_other text,

  -- セクション6: 制約・不安
  weekly_hours text not null,                -- 'lt2' | '2to5' | '5to10' | 'gt10'
  monthly_budget text not null,              -- '0' | 'lt5k' | '5to10k' | '10to30k' | 'gt30k' | 'unlimited'
  concerns text not null,

  created_at timestamptz default now()
);

-- RLS: anonymous は insert のみ許可、select は不可
alter table intake_submissions enable row level security;

create policy "anon can insert"
  on intake_submissions for insert
  to anon
  with check (true);

-- service role は全権(API route から使用)
-- (service_role は RLS bypass)
```

### Supabase 設定手順

1. [supabase.com](https://supabase.com) で新プロジェクト作成(リージョン: Tokyo)
2. プロジェクト名: `flow-consulting-intake` 推奨
3. SQL Editor で上記SQLを実行
4. Project Settings → API から以下を取得:
   - `Project URL` → `SUPABASE_URL`
   - `anon` key → `SUPABASE_ANON_KEY` (今回は使わないが将来用)
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`(API route から insert 用)

## 3. ファイル構成

```
app/
├── [locale]/
│   └── programs/
│       └── claude-code/
│           └── intake/
│               ├── page.tsx                       # フォーム本体ページ
│               ├── done/
│               │   └── page.tsx                   # 送信完了画面
│               └── _components/
│                   ├── intake-form.tsx            # 'use client' フォーム本体
│                   ├── progress-bar.tsx
│                   ├── section-shell.tsx          # セクション共通枠(イントロ+ナビ)
│                   ├── section-1-basic.tsx
│                   ├── section-2-goal.tsx
│                   ├── section-3-tasks.tsx
│                   ├── section-4-ideas.tsx
│                   ├── section-5-skills.tsx
│                   └── section-6-constraints.tsx
└── api/
    └── intake/
        └── route.ts                               # POST: Supabase insert + Mailgun

lib/
└── intake/
    ├── schema.ts                                  # Zod スキーマ(セクション別+全体)
    ├── types.ts                                   # 型定義(Zod から推論)
    ├── options.ts                                 # 選択肢の定数(label/value)
    ├── supabase.ts                                # service_role クライアント
    ├── notify.ts                                  # Mailgun 送信(HTML組み立て)
    └── draft-storage.ts                           # localStorage ヘルパー
```

## 4. 環境変数

`.env.local` に追加(`.env.example` も同時更新):

```
# Supabase (新規追加)
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Mailgun (既存、流用)
MAILGUN_API_KEY=xxxxxxxxx
MAILGUN_DOMAIN=mg.flow-inc.ai     # 実際のドメイン
NOTIFICATION_EMAIL=masa373.dev@gmail.com    # Masaの通知先
```

## 5. 全20問の仕様

各質問の `name`(form field key)、表示文、プレースホルダ、Zod ルール、UI部品を一覧化。

### セクション1. 基本情報

> 表示イントロ: "契約書・請求書・連絡手段の調整に使います。"

| Q   | name                      | 表示                                                      | UI                                                                                                          | Zod                                                       |
| --- | ------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| 1   | `full_name`               | お名前                                                    | `<Input>`                                                                                                   | `string().min(1, '必須です')`                             |
| 2   | `company`                 | 会社名・屋号 (個人事業主の方は屋号、なければ「個人」でOK) | `<Input>`                                                                                                   | `string().min(1, '必須です')`                             |
| 3   | `role_business`           | 役職・事業内容(1-2行)                                     | `<Textarea rows={2}>` プレースホルダ: `代表取締役。中小企業向けバックオフィス代行サービスを運営。社員8名。` | `string().min(5, '5文字以上で入力してください')`          |
| 4   | `email`                   | Email                                                     | `<Input type="email">`                                                                                      | `string().email('有効なEmailアドレスを入力してください')` |
| 5   | `preferred_contact`       | 希望連絡手段 (セッション外でのチャットサポートに使います) | `<RadioGroup>`: Slack / LINE / Email / その他                                                               | `enum(['slack','line','email','other'])`                  |
| 5b  | `preferred_contact_other` | (5でその他を選んだ場合) その他の手段                      | `<Input>`                                                                                                   | `string().optional()` `.refine` で other 選択時は必須     |

### セクション2. ゴール・動機

> 表示イントロ: "ここが3ヶ月の設計図の起点です。少し時間を取って、できるだけ具体的に書いてみてください。"

| Q   | name           | 表示                                                                                                                                                                                             | UI                                                                                                                                                                                                    | Zod                                              |
| --- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| 6   | `goal_3months` | 3ヶ月後、どうなっていたいですか? (200字目安。「こういう業務が回っている」「こんなものを作り終えている」「社内でこういう立ち位置になっている」など、ありありとイメージが湧くように書いてください) | `<Textarea rows={6}>` プレースホルダ: `見積書作成と問い合わせ返信が半自動化されていて、自分の手を離れている。加えて、顧客向け問い合わせダッシュボードのβ版が動いていて、チームで使い始めている状態。` | `string().min(50, '50文字以上で書いてください')` |
| 7   | `stance`       | 講座へのスタンス                                                                                                                                                                                 | `<RadioGroup>`: 自分で手を動かして解決できるようになりたい / 作ったものを他の人(社員・顧客)に渡せるようにしたい / その両方                                                                            | `enum(['self','deliver','both'])`                |
| 8   | `motivation`   | 受講のきっかけ (何を見て、誰から聞いて、なぜ「今」申し込もうと思ったかを教えてください)                                                                                                          | `<Textarea rows={3}>` プレースホルダ: `◯◯さんからの紹介で知り、直近でAI活用の必要性を強く感じていたタイミングと重なった。`                                                                            | `string().min(10)`                               |

### セクション3. 業務・課題

> 表示イントロ: "3ヶ月で「動くもの」を作るための素材集めです。"

| Q   | name               | 表示                                                                                                          | UI                                                                                                                                                                                           | Zod                                |
| --- | ------------------ | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| 9   | `busy_tasks`       | 時間がかかっている / 繰り返し発生している業務を3つ (ボリューム・頻度も添えてください)                         | `<Textarea rows={2}>` × 3、3つ全て必須。プレースホルダ:<br>1: `見積書作成(月20件・1件あたり20-30分)`<br>2: `問い合わせ返信メール(毎日・合計1時間)`<br>3: `週次レポート作成(毎週金曜・2時間)` | `array(string().min(5)).length(3)` |
| 10  | `ai_experience`    | AI / 自動化を試した経験とその結果 (ChatGPT, Claude, スプレッドシートマクロ, Zapier, 社内自作ツール等、何でも) | `<Textarea rows={4}>` プレースホルダ: `ChatGPTで議事録要約を試した。精度は悪くないが、毎回プロンプトをコピペするのが面倒で続かなかった。`                                                    | `string().min(20)`                 |
| 10b | `ai_success_score` | うまくいった度合い (1=全く手応えなし / 5=業務に定着している)                                                  | `<Slider min={1} max={5} step={1}>` または `<RadioGroup>` 横並び 1-5                                                                                                                         | `number().int().min(1).max(5)`     |

### セクション4. 作りたいもの

> 表示イントロ: "ここはブレスト中心です。**上手く書く必要はありません。**"

| Q   | name                  | 表示                                                                                                                                                                | UI                                                                                                                                                                                                                               | Zod                                            |
| --- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 11  | `ideas`               | 作りたい / 自動化したいもの(ブレスト) (思いつくものをすべて。現実味・難易度・実現可能性は一切考慮せず、「あったら嬉しい」だけで選んでOKです。3個以上、最大10個まで) | 動的フィールド: 初期3行、`+ 追加`ボタンで最大10。`useFieldArray` 使用。プレースホルダ:<br>1: `問い合わせ管理ダッシュボード`<br>2: `見積書自動作成ツール`<br>3: `社内FAQチャットボット`                                           | `array(string().min(2)).min(3).max(10)`        |
| 12  | `top_idea`            | この中で「最も作ってみたい1つ」は?                                                                                                                                  | `<RadioGroup>` を `watch('ideas')` で動的生成                                                                                                                                                                                    | `string()` + `.refine`: `ideas` に含まれること |
| 12b | `top_idea_reason`     | その1つを選んだ理由を一言                                                                                                                                           | `<Input>`                                                                                                                                                                                                                        | `string().min(5)`                              |
| 13  | `outcome_description` | それが完成したら「誰」が「何」をできるようになりますか? (使うユーザー像と、その人の行動が具体的に変わるポイントを書いてください)                                    | `<Textarea rows={5}>` プレースホルダ: `営業担当(自分+パート1名)が、問い合わせメールが来た瞬間にステータス・優先度・回答テンプレが並んだダッシュボードを見て、返信まで3分で済む。メール振り分けに使っていた1日30分がゼロになる。` | `string().min(50)`                             |

### セクション5. 現状スキル・環境

> 表示イントロ: "カリキュラムをあなた向けに調整するための情報です。**技術レベルをジャッジするものではありません。**"

| Q   | name                      | 表示                                                                                                                                    | UI                                                                                                                                        | Zod                                          |
| --- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 14  | `programming_level`       | プログラミング経験                                                                                                                      | `<RadioGroup>`: まったくない / HTML/CSS 程度は触ったことがある / 時々スクリプト(Python/JS/VBA等)を書く / 業務で日常的にコードを書いている | `enum(['none','html','occasional','daily'])` |
| 15  | `daily_tools`             | 普段お使いのツール (該当するものをすべて選択)                                                                                           | `<Checkbox>` 複数: Google Workspace / Microsoft 365 / Slack / Notion / Figma / Salesforce or HubSpot / freee or マネーフォワード / その他 | `array(string()).min(1)`                     |
| 15b | `daily_tools_other`       | (15で「その他」を選んだ場合) その他のツール                                                                                             | `<Input>`                                                                                                                                 | `string().optional()`                        |
| 16  | `pc_os`                   | PC: OS                                                                                                                                  | `<RadioGroup>`: macOS / Windows / Linux / その他                                                                                          | `enum(['mac','windows','linux','other'])`    |
| 16b | `pc_os_other`             | (16でその他のとき)                                                                                                                      | `<Input>`                                                                                                                                 | conditional                                  |
| 16c | `pc_admin`                | 管理者権限(ツールを自由にインストールできるか)                                                                                          | `<RadioGroup>`: あり / 限定的(IT部門の承認が必要) / なし                                                                                  | `enum(['full','limited','none'])`            |
| 17  | `pc_spec`                 | PCスペック (機種名・メモリ容量・ストレージ空き容量がわかれば書いてください。不明な方のために、確認方法はセッション開始前にご案内します) | `<Input>` プレースホルダ: `MacBook Pro M2(2023)、メモリ16GB、空き容量約120GB`                                                             | `string().min(3)`                            |
| 18  | `existing_accounts`       | 既存アカウント (現在お持ちのアカウントをすべて選択)                                                                                     | `<Checkbox>` 複数: GitHub / Claude (claude.ai) / ChatGPT / Google Gemini / Cursor / Notion / なし(これから作ります) / その他              | `array(string()).min(0)` (空でもOK)          |
| 18b | `existing_accounts_other` | (18でその他を選んだ場合)                                                                                                                | `<Input>`                                                                                                                                 | conditional                                  |

### セクション6. 制約・不安

> 表示イントロ: "スタート前に揃えておきたいロジ情報と、事前に共有しておきたい制約です。"

| Q   | name             | 表示                                                                                                                                   | UI                                                                                                                                                                                                    | Zod                                                         |
| --- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 19a | `weekly_hours`   | 週あたりの学習時間(セッション1.5h以外)                                                                                                 | `<RadioGroup>`: 2時間未満 / 2〜5時間 / 5〜10時間 / 10時間以上                                                                                                                                         | `enum(['lt2','2to5','5to10','gt10'])`                       |
| 19b | `monthly_budget` | ツール/APIにかけられる月額予算                                                                                                         | `<RadioGroup>`: 0円 / 〜5,000円 / 5,000〜10,000円 / 1〜3万円 / 3万円以上 / 上限なし                                                                                                                   | `enum(['0','lt5k','5to10k','10to30k','gt30k','unlimited'])` |
| 20  | `concerns`       | 最も不安なこと、事前に共有しておきたい制約 (継続できるか、時間が確保できるか、扱えないデータ、社内IT統制の制約、出張予定...など何でも) | `<Textarea rows={5}>` プレースホルダ: `顧客情報を含むデータは社外のAIサービスに送れないため、ローカルで動かす仕組みが必要になるかもしれない。期間中の6月に出張が続くので、その時期の時間確保が不安。` | `string().min(20)`                                          |

### フォーム冒頭テキスト

```
ご回答ありがとうございます。このフォームは、初回セッションをあなたの現状とゴールに
合わせて設計し、3ヶ月の学習効果を最大化するためのものです。

- 所要時間: 約12〜15分
- 途中保存: 可能(同じブラウザで再開できます)
- 回答のコツ: 上手く書こうとせず、素の言葉で。後から一緒に整理していきます
```

### /done ページ表示テキスト

```
ご回答ありがとうございました。

内容を確認のうえ、初回セッションに向けた叩き台のカリキュラム案と
事前準備事項を Email でお送りします(2営業日以内)。
```

## 6. UX 仕様

### セクション切り替え

- 1セクション = 1画面(全6セクション)
- セクション間遷移: framer-motion で fade + slide(0.3s)
- 「次へ」ボタンを押した時、そのセクションのみ Zod バリデーション実行 → 通れば次セクション、通らなければエラー表示
- 「戻る」ボタン: バリデーションせず前セクションへ
- 最後のセクションのみ「送信」ボタン(全体バリデーション → submit)

### プログレス表示

- 上部に shadcn/ui の `<Progress>` を表示(`(currentSection / 6) * 100`)
- 「セクション 3 / 6」のテキストも併記

### 自動保存(localStorage)

```ts
// lib/intake/draft-storage.ts
const KEY = 'flow_intake_draft_v1'

export function saveDraft(data: Partial<IntakeFormValues>) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify({ data, savedAt: Date.now() }))
}

export function loadDraft(): Partial<IntakeFormValues> | null {
  /* ... */
}

export function clearDraft() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(KEY)
}
```

- セクション遷移のたびに `saveDraft(getValues())` を実行
- 初回マウント時に `loadDraft()` で復元、データがあれば「下書きから再開しました」を sonner toast 表示
- 送信成功後に `clearDraft()`

### バリデーションエラー表示

- shadcn/ui の `<FormMessage>` を使用してフィールド下に赤字表示
- 全体バリデーション失敗時は最初のエラーフィールドにスクロール + フォーカス
- toast でも `「入力に不備があります。エラー箇所をご確認ください」` を表示

### モバイル対応

- shadcn/ui のデフォルトでモバイル対応OK
- Q11(動的追加フィールド)はモバイルでも自然に縦並びになるよう確認
- ボタンは min-h-12 でタップしやすく

## 7. 実装ステップ(順序)

各ステップは独立して動作確認可能なゴールを設定。

### Step 1: Supabase セットアップ

- [ ] Supabase プロジェクト作成(リージョン Tokyo)
- [ ] 上記SQL実行(テーブル作成 + RLS + ポリシー)
- [ ] Project Settings → API から URL と service_role key を取得
- [ ] `.env.local` に `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` 追加
- [ ] `.env.example` も同時更新
- [ ] `pnpm add @supabase/supabase-js`
- **動作確認**: テーブルが Supabase Dashboard に表示される

### Step 2: ライブラリと型基盤

- [ ] `lib/intake/schema.ts` — Zod スキーマ(セクション別 6つ + 全体結合)
- [ ] `lib/intake/types.ts` — `z.infer` で型を導出
- [ ] `lib/intake/options.ts` — 選択肢定数 (label, value のオブジェクト配列)
- [ ] `lib/intake/supabase.ts` — service_role クライアント export
- [ ] `lib/intake/draft-storage.ts` — localStorage ヘルパー
- **動作確認**: `pnpm type-check` がパスする

### Step 3: API ルート

- [ ] `app/api/intake/route.ts` を作成。`/api/contact/route.ts` を雛形に
- [ ] POST 受信 → 全体 Zod バリデーション → Supabase insert → Mailgun送信 → 200返却
- [ ] エラー時は400/500を JSON で返却
- [ ] Mailgun送信HTML テンプレは `lib/intake/notify.ts` に分離
- **動作確認**: `curl` で擬似データ POST → DB に行が入り、Masa にメールが届く

### Step 4: ページ骨格

- [ ] `app/[locale]/programs/claude-code/intake/page.tsx`(クライアントコンポーネント `<IntakeForm />` をマウント)
- [ ] `app/[locale]/programs/claude-code/intake/done/page.tsx`(完了文言+Topへのリンク)
- **動作確認**: `pnpm dev` で URL アクセスしてページが表示される

### Step 5: フォーム共通枠

- [ ] `_components/intake-form.tsx`: `useForm` セットアップ、現在セクション state、セクション切替ロジック
- [ ] `_components/progress-bar.tsx`: shadcn `<Progress>` ラッパー
- [ ] `_components/section-shell.tsx`: タイトル + イントロ + 戻る/次へ ボタン
- **動作確認**: 空のセクションでも前後遷移とプログレス更新が動く

### Step 6: 各セクションUI実装

セクション1から6まで順に。各セクションは `<SectionShell>` の中にフィールド群を配置。

- [ ] `section-1-basic.tsx`(Q1〜Q5)
- [ ] `section-2-goal.tsx`(Q6〜Q8)
- [ ] `section-3-tasks.tsx`(Q9〜Q10b、`useFieldArray` で busy_tasks)
- [ ] `section-4-ideas.tsx`(Q11〜Q13、`useFieldArray` で ideas、`watch` で top_idea 連動)
- [ ] `section-5-skills.tsx`(Q14〜Q18)
- [ ] `section-6-constraints.tsx`(Q19〜Q20)
- **動作確認**: 各セクションでバリデーションエラーが正しく表示、有効な値で次へ進める

### Step 7: 自動保存と復元

- [ ] セクション遷移ごとに `saveDraft(getValues())`
- [ ] 初回マウントで `loadDraft()` → `reset(draft)` で復元 + sonner で通知
- [ ] 送信成功後に `clearDraft()` + 完了画面へ遷移
- **動作確認**: 途中で閉じて再オープンで復帰、送信後はクリア

### Step 8: 送信フロー仕上げ

- [ ] 全体バリデーション失敗時のスクロール+フォーカス
- [ ] 送信中ローディング(ボタン disabled + スピナー)
- [ ] 通信エラー時の toast
- [ ] 成功時 `router.push('/programs/claude-code/intake/done')`
- **動作確認**: 全フィールド入力 → 送信 → DBに保存 → Masa にメール → 完了画面遷移

### Step 9: デプロイ

- [ ] Vercel に環境変数(`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`)を設定
- [ ] preview deploy で本番テスト送信
- [ ] 本番反映
- **動作確認**: 本番URLで1件流す

## 8. Acceptance Criteria

- [ ] `/programs/claude-code/intake` をPC/モバイル(iPhone Safari)で開ける
- [ ] 6セクションを進む/戻るできる
- [ ] 各セクションで未入力/不正値があると次へ進めず、エラー文言が表示される
- [ ] ブラウザを閉じて再アクセスすると下書きが復元される
- [ ] 送信成功時に Supabase に1行入り、`NOTIFICATION_EMAIL` にHTMLメールが届く
- [ ] メール本文で全20問の回答が読める形式になっている(セクション見出し付き)
- [ ] 完了画面が表示され、localStorage がクリアされている
- [ ] `pnpm type-check`, `pnpm lint:check`, `pnpm format:check` 全てパス

## 9. v1 スコープ外(やらない)

以下は明示的に v2 以降に回す。実装中に手を出さないこと。

- 認証(マジックリンク、パスコード)
- slug 発行 (受講者ごと個別URL)
- ファイルアップロード(Q17 PCスペック診断結果の画像)
- Slack 通知
- 回答者への自動返信メール
- 管理画面(回答一覧表示)
- Claude API による回答前処理(要約、カリキュラム自動生成)
- インバウンド向け短縮版フォーム(A型、フィット判定用)
- en ロケール対応(messages/en.json への文言追加)
- 専用LP(ヒーロー・サービス説明等を備えた `/programs/claude-code` トップ)

## 10. 既存パターンの参考

実装時に踏襲すべきリポ内の既存実装:

- **API route + Mailgun 送信**: `app/api/contact/route.ts`
- **react-hook-form + zod + sonner toast**: `components/sections/contact-section.tsx`
- **shadcn/ui Form コンポーネント**: `components/ui/form.tsx` (FormField/FormItem/FormControl/FormMessage)
- **path alias**: `@/...`(`tsconfig.json`)
- **環境変数の参照パターン**: `app/api/contact/route.ts` の冒頭(欠落時は500を返す)

## 11. 補足 / よくある疑問への先回り

### Q. `[locale]` 配下に置くと en でも JP 表示になるのは大丈夫?

OK。v1スコープ外。en ユーザーが来てもフォームは JP 表示で、回答も JP で記録される。専用文言を `messages/{locale}.json` に追加するのは v2。

### Q. RLS で anon insert を許可しているが、悪意ある大量送信に弱いのでは?

v1 では Vercel の rate limit + Mailgun の上限を頼り、必要になったら hCaptcha or Cloudflare Turnstile を追加する。v1スコープには含めない。

### Q. `service_role` キーをサーバーで使うのは正しい?

正しい。API route はサーバーサイドのみで実行されるため、`SUPABASE_SERVICE_ROLE_KEY` を `process.env` から読むだけで安全。クライアントには渡さない。

### Q. `useFieldArray` で動的に増やしたフィールドのキーが Q12(top_idea)で参照する時にうまく動かない場合は?

`watch('ideas')` で配列を監視し、`<RadioGroup>` の選択肢を動的生成する。空文字や trim 後 empty な要素は filter で除外。

### Q. ブラウザ戻るボタン対策は?

`useRouter` の `beforeunload` イベントで「下書きは保存されています」を表示。実装は最終調整段階で十分。

---

## 12. 関連ドキュメント

- 設計の経緯と意思決定の背景 → `~/life/flow/business/Claude Codeコンサル - 事前ヒアリング設計.md`
- サービス全体像 → `~/life/tasks/Claude Codeコンサル.md`
