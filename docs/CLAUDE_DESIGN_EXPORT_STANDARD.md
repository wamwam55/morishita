# Claude Design Export (this project)

正本: AIOS `docs/CLAUDE_DESIGN_EXPORT_STANDARD.md`。既定 Provider: Claude Design。

Page Freeze 済み画像を Browser Automation で Claude Design へ投入し、
**Standalone HTML または ZIP Export** を取得 → **Design Source として保存**（捨てない）。

## 進捗
- [ ] Claude Design へ各ページ画像を投入
- [ ] Standalone HTML（無ければ ZIP）を取得
- [ ] 保存: 単一HTML `design/html/<page>.html` / ZIP `design/html/<page>/`
- [ ] 表示に必要な素材を同梱

Export は必ずファイル保存。secret / 実データを入れない。次 → Browser Verification。
