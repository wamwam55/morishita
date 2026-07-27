# ChatGPT Images (this project)

正本: AIOS `docs/CHATGPT_IMAGES_STANDARD.md`。既定 Provider: ChatGPT Images。

Browser Automation で ChatGPT を開き、Page Prompt 入力 → 画像生成 → **保存**まで自動実行。

## Design開始時の必須2案

- [ ] Aggressive Refined: `design/assets/directions/top-aggressive-refined-v1.png`
- [ ] Standard Trustworthy: `design/assets/directions/top-standard-trustworthy-v1.png`
- [ ] 2案を会話内に表示し、`docs/DESIGN_DIRECTION_REVIEW.md`で比較
- [ ] 人間がA/B/混合方針を選択

2案は同じ要件・情報構成を使い、見た目の方向性だけを比較可能にする。ChatGPT画像生成を実際に使い、
テキスト説明や他Providerだけで代用しない。未ログイン・Browser Automation不能・保存失敗時は停止する。

## 進捗
- [ ] Flow Diagram / Design Board（全体1枚）: `design/assets/` → Design Board Freeze
- [ ] 各ページ画像（Site Map 全ページ）: `design/assets/<page>.png` → Page Freeze

**画像が無いページは実装対象にしない。** 画像は必ずファイル保存。secret / 個人情報を入れない。
プロンプト: `docs/PAGE_IMAGE_PROMPTS.md` / `docs/UI_DESIGN_BOARD_PROMPT.md`。
