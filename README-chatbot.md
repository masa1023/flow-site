# RAG AIチャットボット ウィジェット

WeaviateとGoogle Geminiを活用したWebサイト埋め込み型チャットボットウィジェット

## 概要

このプロジェクトは、以下の機能を提供します：

- **Webコンテンツの自動抽出** (Playwright)
- **ベクトル検索データベース** (Weaviate + Google Embedding API)
- **AI回答生成** (Google Gemini API)
- **埋め込み可能なWebウィジェット** (Vanilla JavaScript)

## セットアップ手順

### 1. 必要なAPI設定

以下のサービスのAPIキーを取得してください：

- **Weaviate Cloud**: [https://console.weaviate.cloud/](https://console.weaviate.cloud/)
- **Google Cloud AI Platform**: [https://console.cloud.google.com/](https://console.cloud.google.com/)

### 2. 環境変数の設定

#### Node.js環境 (データ準備時)

```bash
export WEAVIATE_HOST="your-instance.weaviate.network"
export WEAVIATE_API_KEY="your-weaviate-api-key"
export GOOGLE_API_KEY="your-google-api-key"
```

### 3. データ準備

```bash
# 依存関係のインストール
npm install

# Webサイトのコンテンツを抽出
node scraper.js https://your-website.com

# Weaviateにデータを登録
node indexer.js
```

### 4. Webサイトへの埋め込み

#### 方法1: スクリプトタグのdata属性で設定

```html
<script 
  src="https://your-domain.com/chat-widget.js" 
  data-weaviate-host="your-instance.weaviate.network"
  data-weaviate-api-key="your-weaviate-api-key"
  data-google-api-key="your-google-api-key"
  async defer>
</script>
```

#### 方法2: グローバル変数で設定

```html
<script>
  window.WEAVIATE_HOST = 'your-instance.weaviate.network';
  window.WEAVIATE_API_KEY = 'your-weaviate-api-key';
  window.GOOGLE_API_KEY = 'your-google-api-key';
</script>
<script src="https://your-domain.com/chat-widget.js" async defer></script>
```

## ファイル構成

```
├── scripts/
│   ├── scraper.js          # Webコンテンツ抽出スクリプト
│   └── indexer.js          # Weaviateデータ登録スクリプト
├── public/
│   └── chat-widget.js      # 埋め込み用ウィジェット
├── ai-chatbot-package.json # 依存関係定義
└── README-chatbot.md       # このファイル
```

## セキュリティ注意事項

⚠️ **APIキーの管理**
- プロダクション環境では、APIキーを適切に管理してください
- クライアントサイドでAPIキーが露出することに注意してください
- 可能であればプロキシサーバーを経由してAPIアクセスを行うことを推奨します

## カスタマイズ

### スタイルのカスタマイズ

chat-widget.js内の`styles`変数を編集してチャットウィンドウの見た目を変更できます。

### プロンプトのカスタマイズ

`handleUserMessage`関数内のプロンプトテンプレートを編集して、AIの応答スタイルを調整できます。

## トラブルシューティング

### 環境変数エラー

```
Missing required environment variables:
  - WEAVIATE_HOST
```

→ 必要な環境変数が設定されていません。上記のセットアップ手順を確認してください。

### CORS エラー

チャットウィジェットでCORSエラーが発生する場合は、WeaviateとGemini APIの設定を確認してください。

### データが見つからない

検索結果が返らない場合は、以下を確認してください：

1. `indexer.js`が正常に完了しているか
2. Weaviateコレクションにデータが登録されているか
3. スクレイピングしたコンテンツが適切にチャンク分割されているか

## ライセンス

MIT License