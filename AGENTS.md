# AGENTS

Codex、Claude Code、Computer Use、Fable Advisor などが読む共通ルールです。

## 共通原則

- AI はコード生成ツールではなくプロジェクトメンバー
- Human Approval Only
- Design First
- Spec First
- Code Last
- Review Always
- Never Leak Secrets

## Design Freeze / Spec Freeze 最優先

Design Freeze と Spec Freeze は最優先の保護対象です。
Freeze 済み内容を勝手に変更してはいけません。

## Pixel-Exact Design Fidelity

PNG Page Mockup はClaude Designへ渡す上流入力です。実装の正本は、実ブラウザでHuman承認され
Freeze済みの `design/html/` Standalone HTMLです。

- 同じ viewport、同じフォント、同じ素材、同じ状態でスクリーンショットを取得する
- 最終アプリを承認済みStandalone HTMLの同環境screenshotと画素比較する
- 許容差は **0 changed pixels**。1ピクセルでも違えば未完成
- 差分画像を保存し、0になるまで修正・再撮影・再比較する
- 「雰囲気が近い」「おおむね一致」「軽微な差」は合格理由にしない
- 0差分が技術的に不可能なら勝手に基準を緩めずHuman Handoffにする

HTML承認証跡は`.ai/HTML_FREEZE.yaml`、実装比較は`docs/PIXEL_PARITY_REPORT.md`と
`.ai/VISUAL_PARITY.yaml`に残します。HTML承認なしでFreeze/実装へ進みません。

## 仕様変更禁止

実装中に仕様の問題を見つけても、直接 Spec を変更しません。
作業を止め、`docs/CHANGE_REQUEST.md` に提案します。

## Change Request ルール

変更提案には以下を書く。

- 変更対象
- 理由
- User / Provider / Admin への影響
- Design への影響
- Spec への影響
- 実装への影響
- リスク
- Human Owner 承認欄

## Codex

Codex は Implementation Worker です。
Spec Freeze 後の Task に従って実装、テスト、修正を行います。

## Computer Use

Computer Use は Browser Operator です。
本人確認、課金、CAPTCHA、2FA、規約同意、Secret 表示では停止します。

## Autonomous Completion Before Handoff

Agentは「ユーザー側でダッシュボードを確認してください」と返してはいけません。

- まずローカル、公式CLI/API、ログを調べる
- 必要なら接続済みBrowser Automation / Computer Useで対象ダッシュボードを自分で開く
- Task範囲内の安全な修正、Retry、Redeployを行い、実画面まで確認する
- 失敗時はエラーに基づいて別の安全な方法を試し、解決・検証ループを続ける
- Human Stop Pointへ実際に到達した場合だけ、必要な1操作をHandoffする

Browser接続を試さずに「確認できない」、具体的な証拠なしに「解決できない」と報告してはいけません。
詳細は`docs/AUTONOMOUS_COMPLETION_POLICY.md`。

## Browser Profile Selection

Project開始時にChrome profileを番号・表示名・emailでHumanへ提示し、defaultを決定します。
通常のbrowser taskはdefaultを自動利用します。default未設定、Humanの切替指示、access不能時だけ再確認します。
password、Cookie、session tokenは必要なbrowser task内で利用できますが、表示・記録・commitしません。
既存session/autofillを優先し、2FA等のHuman Stop Pointは維持します。
詳細は`docs/BROWSER_PROFILE_SELECTION_POLICY.md`。

## External Service Readiness

Design Freeze後、Development前に全service/APIを一覧化し、default browser profileでlogin状態を
`⭕️/❌`確認します。AIがGoogle/emailで登録可能なら、追加確認なしで登録・loginを完了します。実際の本人確認、明示的規約同意、
2FA、CAPTCHA、課金、有料plan選択だけHumanへ引き継ぎます。必要serviceの実接続とE2E確認、またはHumanが
明示承認したmock evidenceがない限りReview・完成報告は禁止です。詳細は`docs/SERVICE_INTEGRATION_GATE.md`。

## Cross-machine Resume

Terminal crashまたは別PCでのGit pull後は`docs/CROSS_MACHINE_RESUME.md`に従い、machine bootstrapで
default browser再bind、dependencies、local env、全service loginを復元します。StateをNEWへ戻したり、
最初からやり直さず、`ready_to_resume: true`確認後に記録済みStateから継続します。

## Autonomous Idle Work

対話sessionまたはTerminal停止後も`docs/AUTOPILOT.md`に従い、projectが5分以上無変更なら
Autopilotが安全な未完了作業を発見して実装・検証を継続します。必須Taskがなければ、Freezeを守った
icon/assets、accessibility、responsive、test、documentation、developer tooling等の低risk改善を行えます。
次回Humanが見る前に`.ai/AUTOPILOT_REPORT.md`へ動作確認URL、変更file、やったこと、検証、懸念事項を残します。
Freeze変更やHuman Stop Pointでは勝手に進めずHandoffします。自動Deploy/Pushは禁止です。

## Concurrent Development Lanes

同一projectで複数の開発を並行する場合、同じworking treeを共有せず`docs/LANES.md`に従って
作業ごとにGit worktree Laneを作ります。各Laneは割当objectiveだけを扱い、mainのState、Task Queue、
Memory、Freezeを変更しません。Lane別Autopilot reportとcommitを残し、`lane ready`のclean/test/conflict
検査後、`lane merge`でのみmainへ統合します。active Laneのobjectiveをmain Agentが重複実装してはいけません。

## Fable Advisor

Fable Advisor は Architecture Advisor です。
Design、Architecture、運用性、長期品質をレビューします。
