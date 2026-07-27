# HTML Freeze (this project)

正本: AIOS `docs/HTML_FREEZE_STANDARD.md`。**HTML Freeze = UI 開発の完了点。**

実ブラウザでHuman承認されたStandalone HTMLをFreezeし **Design Source** として確定。
**React 実装はこの HTML だけを元に行う**（画像/記憶で作り直さない）。React は HTML→component 変換。

## 進捗
- [ ] Browser Verification 済み / Human Ownerが実ブラウザ表示を承認
- [ ] `docs/HTML_FREEZE_REVIEW.md` に approved 記録
- [ ] Design Source 確定: `design/html/`（捨てない）
- [ ] 以後の変更は `docs/CHANGE_REQUEST.md` 経由

**HTML Freeze 前に React 実装しない。** Freeze 後 → Implementation（Repository 層のみ接続 / CMS 後続）。
