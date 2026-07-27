# Claude Design (this project)

正本: AIOS `docs/CLAUDE_DESIGN_STANDARD.md`。既定 Provider: Claude Design。

Browser Automation で Claude Design へ画像投入 → **Standalone HTML / ZIP Export** 取得。

## 進捗
- [ ] Page Freeze 済み画像（`design/assets/`）を投入
- [ ] Standalone HTML（無ければ ZIP）取得 → `design/html/<page>.html`（or `<page>/`）に保存（捨てない）
- [ ] Export 素材 → `design/assets/`
- [ ] HTML Review（実ブラウザで 差分/レスポンシブ/scroll/hover/focus）→ Pixel Review → HTML Freeze

プロンプト: `docs/CLAUDE_DESIGN_PROMPT.md`。HTML に secret / 実データを入れない。
