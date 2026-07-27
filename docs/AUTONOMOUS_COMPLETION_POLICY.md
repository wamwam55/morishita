# Autonomous Completion Policy (this project)

正本: AIOS `docs/AUTONOMOUS_COMPLETION_POLICY.md`。

- [ ] ローカル/CLI/API/ログをAgentが調査
- [ ] 必要なら接続済みブラウザでProvider dashboardをAgentが確認
- [ ] 安全でTask範囲内の修正・Retry・RedeployをAgentが実行
- [ ] CLIと実ブラウザで結果を再確認
- [ ] Humanへ「そちらで確認」を返していない
- [ ] Handoff時は実際のStop Pointと必要な1操作を記録

本人確認、CAPTCHA、2FA、課金、Secret、規約同意、未承認の破壊的/本番操作へ
実際に到達するまでは、Agentが診断・操作・修正・検証を続ける。
