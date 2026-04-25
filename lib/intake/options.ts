export type Option<V extends string = string> = {
  value: V
  label: string
}

export const PREFERRED_CONTACT_OPTIONS = [
  { value: 'slack', label: 'Slack' },
  { value: 'line', label: 'LINE' },
  { value: 'email', label: 'Email' },
  { value: 'other', label: 'その他' },
] as const satisfies readonly Option[]

export const STANCE_OPTIONS = [
  { value: 'self', label: '自分で手を動かして解決できるようになりたい' },
  {
    value: 'deliver',
    label: '作ったものを他の人(社員・顧客)に渡せるようにしたい',
  },
  { value: 'both', label: 'その両方' },
] as const satisfies readonly Option[]

export const AI_SUCCESS_SCORE_OPTIONS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
] as const satisfies readonly Option[]

export const PROGRAMMING_LEVEL_OPTIONS = [
  { value: 'none', label: 'まったくない' },
  { value: 'html', label: 'HTML/CSS 程度は触ったことがある' },
  {
    value: 'occasional',
    label: '時々スクリプト(Python/JS/VBA等)を書く',
  },
  { value: 'daily', label: '業務で日常的にコードを書いている' },
] as const satisfies readonly Option[]

export const DAILY_TOOLS_OPTIONS = [
  { value: 'google_workspace', label: 'Google Workspace' },
  { value: 'microsoft_365', label: 'Microsoft 365' },
  { value: 'slack', label: 'Slack' },
  { value: 'notion', label: 'Notion' },
  { value: 'figma', label: 'Figma' },
  { value: 'crm', label: 'Salesforce or HubSpot' },
  { value: 'accounting', label: 'freee or マネーフォワード' },
  { value: 'other', label: 'その他' },
] as const satisfies readonly Option[]

export const PC_OS_OPTIONS = [
  { value: 'mac', label: 'macOS' },
  { value: 'windows', label: 'Windows' },
  { value: 'linux', label: 'Linux' },
  { value: 'other', label: 'その他' },
] as const satisfies readonly Option[]

export const PC_ADMIN_OPTIONS = [
  { value: 'full', label: 'あり' },
  { value: 'limited', label: '限定的(IT部門の承認が必要)' },
  { value: 'none', label: 'なし' },
] as const satisfies readonly Option[]

export const EXISTING_ACCOUNTS_OPTIONS = [
  { value: 'github', label: 'GitHub' },
  { value: 'claude', label: 'Claude (claude.ai)' },
  { value: 'chatgpt', label: 'ChatGPT' },
  { value: 'gemini', label: 'Google Gemini' },
  { value: 'cursor', label: 'Cursor' },
  { value: 'notion', label: 'Notion' },
  { value: 'none', label: 'なし(これから作ります)' },
  { value: 'other', label: 'その他' },
] as const satisfies readonly Option[]

export const WEEKLY_HOURS_OPTIONS = [
  { value: 'lt2', label: '2時間未満' },
  { value: '2to5', label: '2〜5時間' },
  { value: '5to10', label: '5〜10時間' },
  { value: 'gt10', label: '10時間以上' },
] as const satisfies readonly Option[]

export const MONTHLY_BUDGET_OPTIONS = [
  { value: '0', label: '0円' },
  { value: 'lt5k', label: '〜5,000円' },
  { value: '5to10k', label: '5,000〜10,000円' },
  { value: '10to30k', label: '1〜3万円' },
  { value: 'gt30k', label: '3万円以上' },
  { value: 'unlimited', label: '上限なし' },
] as const satisfies readonly Option[]

export const SECTION_TITLES = [
  '基本情報',
  'ゴール・動機',
  '業務・課題',
  '作りたいもの',
  '現状スキル・環境',
  '制約・不安',
] as const

export const SECTION_INTROS = [
  '契約書・請求書・連絡手段の調整に使います。',
  'ここが3ヶ月の設計図の起点です。少し時間を取って、できるだけ具体的に書いてみてください。',
  '3ヶ月で「動くもの」を作るための素材集めです。',
  'ここはブレスト中心です。**上手く書く必要はありません。**',
  'カリキュラムをあなた向けに調整するための情報です。**技術レベルをジャッジするものではありません。**',
  'スタート前に揃えておきたいロジ情報と、事前に共有しておきたい制約です。',
] as const

export const TOTAL_SECTIONS = SECTION_TITLES.length
