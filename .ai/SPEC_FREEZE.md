# Spec Freeze

Spec Freeze は Human Owner が承認するまで `pending` です。

## Status

- status: approved
- requested_at: 2026-08-10
- approved_by: Human Owner（チャットユーザー）
- approved_at: 2026-08-11T08:50:00+09:00
- revision: CR-002

## Freeze Targets

- Functional Requirements: CR-001の個人・法人料金表導線を維持し、CR-002により会計3注記を削除
- Non-functional Requirements:
- State:
- Data:
- Permission:
- Error Handling:
- API:
- Test: 導線のタブ切替、文言照合、PC/モバイル表示、0 changed pixels
- Deploy: Human承認後に別途実施（自動push/deploy無効）

## Implementation Rules

- Codex は Spec Freeze 後にのみ本実装する
- Spec 変更が必要な場合は Change Request を作成する
- Secret を仕様に書かない

## Review

- Claude Code:
- Security Reviewer:
- Human Owner: CR-002 and updated Freeze approved 2026-08-11T08:50:00+09:00
