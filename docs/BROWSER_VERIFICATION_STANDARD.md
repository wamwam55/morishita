# Browser Verification (this project)

正本: AIOS `docs/BROWSER_VERIFICATION_STANDARD.md`。

**Standalone HTML を実ブラウザで表示**し、崩れ・欠落が無いか確認する（コードへ進む前）。

## 進捗
- [ ] `design/html/<page>.html`（or `<page>/index.html`）を実ブラウザで表示
- [ ] 画像/素材の参照切れなし・レイアウト/配色/タイポが Mockup どおり
- [ ] Human確認用スクリーンショット取得
- [ ] desktop/mobileの必要viewportでレスポンシブ表示確認
- [ ] animation/font/image load、scroll/hover/focus、リンク/フォームを確認

実表示を必ず行う。参照切れは素材同梱で修正。次 → Human HTML Review / HTML Freeze。
