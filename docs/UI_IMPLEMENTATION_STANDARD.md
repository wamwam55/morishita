# UI Implementation (this project)

正本: AIOS `docs/UI_IMPLEMENTATION_STANDARD.md`。既定 Provider: Claude Code。

**実ブラウザでHuman承認されHTML Freeze済みの `design/html/` のみ参照**してReactへ変換。
**React は UI 作成ではなく HTML→Component 変換。HTML Freeze 前のページは React 実装禁止。**

## 進捗
- [ ] `design/html/<page>.html` を解析（HTML のみ参照）
- [ ] `design/assets/` の素材 → `public/assets/` or `src/assets/`
- [ ] Component 変換（Next.js/React/Tailwind・元 HTML と一致）
- [ ] Repository Integration（データ分離）→ CMS Integration
- [ ] 全ページを同一寸法で撮影し `apos pixel-compare` が0 changed pixels
- [ ] Self Review（reference/actual/diff・`docs/PIXEL_PARITY_REPORT.md`）→ Deploy

Design Source の変更は `docs/CHANGE_REQUEST.md` 経由。secret を実装/ログに入れない。
React化でレイアウトを再解釈、簡略化、一般的なコンポーネントへ置換しない。
