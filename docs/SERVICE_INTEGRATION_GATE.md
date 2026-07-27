# Service Integration Gate

デザイン承認後、実装開始前に外部サービスをすべて列挙し、`.ai/SERVICE_READINESS.yaml`へ記録する。

各serviceには最低限、次を記録する。

- `id`, `purpose`, `required`, `required_for_completion`
- `provider`, `registration_url`, `mode` (`real` / `mock`)
- `auth_status` (`authenticated` / `not_required` / `not_authenticated`)
- `integration_status` (`pending` / `connected`)
- `e2e_verified`
- `mock_approved_by`（mockの場合にHumanの明示承認が必須）

Project default browser profileで各登録サイトを開き、ログイン済みなら`⭕️`、未ログインなら`❌`として
Humanへ一覧提示する。AIはGoogle loginまたはemail registrationを進めてよい。本人確認、明示的な規約同意、
2FA、CAPTCHA、課金、有料plan選択へ実際に到達した場合だけHuman Stop Pointとする。

必要な実serviceが`connected`かつE2E verifiedになるまで、Review・完成報告は禁止する。
