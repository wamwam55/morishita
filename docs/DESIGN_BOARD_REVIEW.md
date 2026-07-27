# Design Board Review

UI 実装前の **Design Board 人間確認**の記録。承認されるまで UI 実装へ進まない。
ルール: AIOS `docs/DESIGN_BOARD_POLICY.md`。secret / 個人情報は書かない。

## 対象

- Design Board 画像: `design/assets/board-vX.png`（版: PLACEHOLDER）
- 対応 State: DESIGN → (Freeze) FROZEN
- Quality Gate: Gate 2 (Design Approved) / Gate 3 (Freeze Approved)

## 確認観点（チェックリスト）

- [ ] 全体遷移図に画面の漏れ・行き止まりがない
- [ ] エントリ / 主要導線 / 出口が明確
- [ ] セクション順と情報階層が妥当
- [ ] 主要 CTA の位置・数が適切
- [ ] トーン / ブランドに合っている
- [ ] 対象ユーザーの主要タスクが達成できる導線になっている
- [ ] 大幅なブランド変更・大きな仕様変更を含まない（含むなら Human 判断）

## レビュー結果

| 日付 | 版 | 判定 | レビュアー | コメント |
| --- | --- | --- | --- | --- |
| PLACEHOLDER | v1 | pending / approved / needs_fix | PLACEHOLDER | PLACEHOLDER |

## 軽微事項の自動判断

Design Board 内の軽微事項（ワイヤー細部 / セクション順 / 曜日表示 / CTA 位置 /
コンポーネント分割）は Auto Decision Policy に従い自動決定し、`docs/DECISIONS.md` に理由を残す。

## 承認 → Freeze

- 承認（approved）後に `apos freeze` で Design Freeze。
- Freeze 済み Board の変更は `docs/CHANGE_REQUEST.md` 経由で人間承認。
