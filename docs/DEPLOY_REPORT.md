# Deploy Report

Deploy 結果を記録します。

## Summary

- Version: CR-001
- Commit: 55a51049d00b88a6c435b944e2b9f310b800fc25
- Environment: production (Vercel)
- Deployed by: Vercel Git integration
- Approved by: Human Owner（チャット指示「プッシュデプロイ」）
- Deployed at: 2026-08-11 02:08 JSTまでに配信確認

## Checks

- Review Passed: Yes（Freeze parity 0 changed pixels、実画面機能確認）
- Rollback Plan: `55a5104` のrevert commitをmainへpush
- Monitoring: 本番コンポーネントHTTP 200、Chrome実画面DOM・クリック確認
- Secret Not Logged: Yes

## Result

- Status: Success
- URL: https://www.morishita-tax.jp/
- Notes: 法人料金表導線と会計処理の目安3件を確認。横オーバーフローなし。

## Rollback

- Trigger: 法人料金表へ切り替わらない、注記欠落、表示崩れが確認された場合
- Procedure: `git revert 55a5104` をレビュー後にmainへpushし、Vercel配信と実画面を再確認
- Owner: Human Owner / Codex
