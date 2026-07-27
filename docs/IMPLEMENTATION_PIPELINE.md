# Implementation Pipeline (this project)

Implementation Engine 工程。正本: AIOS `docs/IMPLEMENTATION_PIPELINE.md`。既定 Provider: Claude Code。

**HTML Freeze 済み**の単一 HTML を Next.js/React/Tailwind へ変換。**Repository 層のみ接続**。

## 進捗
- [ ] HTML 解析（レイアウト/配色/余白/タイポ/コンポーネント構造）
- [ ] 素材を自動配置（`public/assets/` or `src/assets/`）
- [ ] component 分解（Next.js/React/Tailwind）
- [ ] **Repository 層に接続**（データ取得を分離・fetch をコンポーネントに埋めない）
- [ ] CMS Integration（Repository の後の別工程）
- [ ] Self Review（`docs/UI_REVIEW_CHECKLIST.md`・元画像との差分）→ Deploy

**HTML Freeze 前に実装しない。** Freeze 違反は `docs/CHANGE_REQUEST.md` 経由。secret を実装/ログに入れない。
