# Prototype Pipeline (this project)

Prototype Generator 工程。正本: AIOS `docs/PROTOTYPE_PIPELINE.md`。既定 Provider: Claude Design。

Page Freeze 済み画像を **Browser Automation** で Prototype Generator へ渡し、**単一 HTML** を生成。

## 進捗
- [ ] Page Freeze 済み画像を確認（`design/assets/`）
- [ ] 単一 HTML 生成 → `design/html/<page>.html`（**中間成果物として保存・捨てない**）
- [ ] 素材 → `design/html/assets/`
- [ ] HTML Review → HTML Freeze（`docs/HTML_FREEZE_REVIEW.md`）

プロンプト: `docs/CLAUDE_DESIGN_PROMPT.md`。
**HTML Freeze 前に React 実装へ進まない。** HTML に secret / 実データを入れない。
