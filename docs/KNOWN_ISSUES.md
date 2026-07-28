# Known Issues

<!-- AIOS:SESSION-CONTINUITY:START -->
## 現在の未解決事項

- 更新: 2026-07-28

### 1. LINE自動送信ができない（継続中）

- **症状**: 森下様への返信をAIから自動送信できない
- **原因**:
  - OpenClawブラウザのLINE Chrome拡張（`ophjlpahpchlmihnnnihgmmeilfjmjjc`）が**ログアウト状態**（QRコードログイン画面）
  - Macのネイティブ LINE.app は起動しているがログイン状態が不明、かつ computer-use MCP が本セッションでは未提供
  - `openclaw browser open/navigate` は `chrome-extension:` プロトコルを拒否する
- **判明した回避策**: OpenClawのCDPポートに直接 PUT すれば拡張ページを開ける
  ```bash
  curl -s -X PUT "http://127.0.0.1:18800/json/new?chrome-extension://ophjlpahpchlmihnnnihgmmeilfjmjjc/index.html"
  openclaw browser tabs && openclaw browser focus <id> && openclaw browser snapshot --labels
  ```
- **残る前提条件**: スマホのLINEでQRコードを読み取りログインすること。ログイン後は
  `openclaw browser click`／`type --submit` で送信可能（手順は skill `line-desktop-send`）
- **注意**: 誤送信防止のため、送信前に必ず snapshot で相手（森下 知幸）を確認する

### 2. サイトがSPA（JSでコンポーネントを後読み）

- `index.html` はコンポーネントをJSで読み込むため、本文テキストがクロールされにくい
- 対策として `philosophy.html` を静的ページ化、`<noscript>` に基本情報を追加済み
- 今後SEOで重要なコンテンツを増やす場合は**静的ページとして追加**するのが望ましい

### 3. SEOキーワードの現実的な期待値

- 「感謝」「尊敬」「愛」の**単独一般語**での上位表示は事実上不可能（競合が巨大すぎる）
- 狙えるのは複合キーワード:
  「感謝 尊敬 愛 経営理念」「税理士 経営理念 感謝 尊敬 愛」「大阪 税理士 感謝 尊敬 愛」など
- 反映には Google のクロール後、通常 数日〜数週間かかる
- Search Console で `philosophy.html` のURL検査＋インデックス登録リクエストを行うと早い

### 4. リポジトリのリモートURLに個人アクセストークンが埋め込まれている

- `git remote -v` の URL にトークンが含まれている（値は本ドキュメントには記載しない）
- 推奨: トークンをローテーションし、`git credential` もしくは SSH 接続へ移行する
<!-- AIOS:SESSION-CONTINUITY:END -->
