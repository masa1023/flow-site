# FlowBot - RAG AI Chat Widget

An embeddable chatbot widget powered by Weaviate and Google Gemini for intelligent website assistance.

## Overview

FlowBot provides the following features:

- **Automatic Web Content Extraction** (Playwright)
- **Vector Search Database** (Weaviate + Snowflake Embedding API)
- **AI Response Generation** (Google Gemini API)
- **Embeddable Web Widget** (Vanilla JavaScript)

## Setup Guide

### 1. API Configuration

Obtain API keys from the following services:

- **Weaviate Cloud**: [https://console.weaviate.cloud/](https://console.weaviate.cloud/)
- **Google Cloud AI Platform**: [https://console.cloud.google.com/](https://console.cloud.google.com/)

### 2. Data Preparation

```bash
# Install dependencies
npm install

# Install Playwright
npx playwright install

# Extract website content
node scraper.js https://your-website.com

# Index data into Weaviate
node indexer.js
```

### 3. Website Embedding

```html
<script
  src="https://your-domain.com/chat-widget.js"
  data-weaviate-host="your-instance.weaviate.network"
  data-weaviate-api-key="your-weaviate-api-key"
  data-google-api-key="your-google-api-key"
  async
  defer
></script>
```

## File Structure

```
├── scripts/
│   ├── scraper.js          # Web content extraction script
│   └── indexer.js          # Weaviate data indexing script
├── public/
│   └── chat-widget.js      # Embeddable chat widget
└── README-chatbot.md       # This file
```
