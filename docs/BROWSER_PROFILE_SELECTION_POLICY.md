# Browser Profile Selection Policy (this project)

正本: AIOS `docs/BROWSER_PROFILE_SELECTION_POLICY.md`。

- [ ] Project開始時に番号・表示名・emailを起動順で表示しdefaultを決定
- [ ] 通常操作はproject default profileを自動利用
- [ ] default未設定・Humanの切替指示・access不能時だけ再選択
- [ ] visible accountを確認してから操作
- [ ] password / Cookie / session tokenは必要なtask内だけで利用し、表示・記録・commitしない
- [ ] 2FA / CAPTCHA / 本人確認 / 課金 / 規約同意はHuman Stop Pointにする
