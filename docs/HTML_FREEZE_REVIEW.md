# HTML Freeze Review

Prototype Generator が生成した単一 HTML の人間確認記録。承認まで React 実装へ進まない。
正本: AIOS `docs/UI_FREEZE_POLICY.md`。secret / 実データは書かない。

## 対象
- 単一 HTML: `design/html/`（ページごと・中間成果物として保存済み）
- 前提: Page Freeze 承認済み

## チェック
- [ ] 各ページ画像（`design/assets/`）を HTML が忠実に再現
- [ ] レイアウト・配色・余白・タイポ・コンポーネント構造が一致
- [ ] サンプル素材の参照が壊れていない
- [ ] 単一 HTML が保存されている（捨てていない）
- [ ] secret / 実データ / 個人情報を含まない
- [ ] 全ページを実ブラウザで表示し、スクリーンショットが保存されている
- [ ] Human OwnerがPNGではなくbrowser表示されたStandalone HTMLを確認した
- [ ] `.ai/HTML_FREEZE.yaml`に全ページのbrowser確認とHuman承認が記録されている

## レビュー結果
| 日付 | ページ | 版 | 判定 | レビュアー | コメント |
| --- | --- | --- | --- | --- | --- |
| PLACEHOLDER | PLACEHOLDER | v1 | pending / approved / needs_fix | PLACEHOLDER | PLACEHOLDER |

全ページの実ブラウザ表示をHumanが承認（approved）して **HTML Freeze** → Implementation Engineへ。
