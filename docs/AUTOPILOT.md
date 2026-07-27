# AIOS Autopilot

Terminalや対話session停止後は、`apos autopilot start .`で起動済みのbackground workerがprojectの無変更時間を検知して安全な作業を継続します。

- API key直利用なし。login済みClaude Code、fallbackでCodex CLIを利用
- 人が編集中は待機
- Task、test failure、bug、security、accessibility、performance、toolingの順で改善
- Freeze変更、本番操作、課金、本人確認、CAPTCHA、2FA、規約同意、Secretでは停止
- `.ai/AUTOPILOT_REPORT.md`にURL、file一覧、実施内容、verification、懸念事項を記録
- 自動Deploy、Pushはしない

状態確認は`apos autopilot status .`、即時1cycleは`apos autopilot once .`、停止は`apos autopilot stop .`を使います。
