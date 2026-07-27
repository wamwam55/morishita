# API Keys Setup

API key と Secret の設定手順です。

## Rule

このファイルに実値を書かない。
`.env.example` には `PLACEHOLDER` のみを書く。

## Required Keys

```env
SERVICE_API_KEY=PLACEHOLDER
SERVICE_WEBHOOK_SECRET=PLACEHOLDER
```

## Human Steps

1. Human Owner がサービスにログインする
2. Secret を作成する
3. Secret manager またはローカル `.env` に保存する
4. AI には実値を共有しない
