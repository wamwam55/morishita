# Task Queue

Spec Freeze 後に Codex へ渡す Task を管理します。

## Rules

- Spec Freeze 前に本実装 Task を開始しない
- 各 Task は完了条件を持つ
- Design / Spec 変更が必要なら `docs/CHANGE_REQUEST.md` に提案する
- Secret を Task に含めない

## Ready

### TASK-001: PLACEHOLDER

- State:
- Owner:
- Related Spec:
- Goal:
- Scope:
- Out of Scope:
- Done Criteria:
- Test:
- Review:

## In Progress

- None

## Blocked

- None

## Done

### TASK-002: 「会計処理の目安」の削除

- State: done / published
- Owner: Codex
- Related Spec: CR-002（`docs/CHANGE_REQUEST.md`）
- Result: Standalone HTML正本と実装HTML/CSSから対象ブロック・専用CSSを完全削除
- Test: 対象文言0件、法人料金タブ切替正常、390px横オーバーフローなし、1440px／500pxとも0 changed pixels
- Publication: `9633c92`を本番反映し、実画面確認・森下様への完了報告まで完了
