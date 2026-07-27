# AI Commands

Claude Code がプロジェクト内で実行判断に使う簡潔なコマンドルールです。
詳細仕様は AI_PROJECT_OS 本体の `commands/` を参照します。

## 実行前の共通ルール

1. 必ず `.ai/PROJECT_STATE.yaml` を読む
2. 現在 State と未通過 Gate を確認する
3. `.ai/HUMAN_HANDOFF.md` に未解決事項があれば先に処理する
4. Design Freeze / Spec Freeze 前に本実装を始めない
5. Freeze 済み成果物を変更したい場合は Change Request を作る
6. Secret の実値を読んだり、書いたり、通知したりしない
7. 本人確認、課金、CAPTCHA、2FA、規約同意、Secret 入力では停止する
8. Human Approval を AI が代行しない
9. PNG選択後にClaude DesignでStandalone HTMLを生成し、実ブラウザでHuman承認を得る
10. `.ai/HTML_FREEZE.yaml`が`approved`になる前にFreeze/React実装へ進まない
11. 承認済みHTML renderingと実装の画素差は0のみ合格。`.ai/VISUAL_PARITY.yaml`が`passed`になる前にReviewへ進まない
12. Dashboard確認を人間へ返さず、CLI/API/接続済みBrowserでAgent自身が確認・修正・再検証する
13. Human Stop Pointへ実際に到達するまで「解決できない」と報告しない
14. Project開始時にdefault browser profileを決め、通常操作はそれを自動利用する
15. password/Cookie/session tokenは必要なtask内だけで利用し、表示・記録・commitしない
16. Design Freeze後に全serviceを列挙し、default profileでlogin状態を⭕️/❌確認する
17. 必要service未接続またはHuman明示承認のmock evidenceなしでReview・完成報告しない
18. terminal crash/Git pull後はmachine-bootstrapでlocal browser/env/service loginを復元してから継続する
19. 通常作業時はAutopilotを起動し、session停止後も安全な未完了作業を継続する
20. 次回Human向けに`.ai/AUTOPILOT_REPORT.md`へURL、file、実施内容、検証、懸念事項を必ず残す
21. 複数開発は同じworking treeで行わず、objectiveごとにLaneを作る
22. active Laneの作業をmain Agentが重複実装せず、ready/test/conflict gate後だけmergeする

## コマンド一覧

| Command | 使う State | 目的 | 次の候補 |
| --- | --- | --- | --- |
| `/aios-new` | `NEW` | Project Profile と初期 State を作る | `/aios-vision` |
| `/aios-vision` | `VISION` | Mission、対象ユーザー、成功条件、非対象範囲を決める | `/aios-design` |
| `/aios-design` | `DESIGN` | 体験、情報設計、操作フロー、品質基準を作る | `/aios-freeze` |
| `/aios-freeze` | `DESIGN_REVIEW` / `FROZEN` | Design Freeze / Spec Freeze を承認済みにする | `/aios-setup` |
| `/aios-setup` | `SETUP` | Task、環境、Automation、Review 方針を整える | `/aios-develop` |
| `/aios-develop` | `DEVELOPMENT` | Codex に Freeze 済み Task を実装させる | `/aios-review` |
| `/aios-review` | `REVIEW` | 実装、仕様、Design、Security、品質を確認する | `/aios-deploy` |
| `/aios-deploy` | `DEPLOY` | Deploy、Rollback、監視、Human Approval を確認する | `/aios-operate` |
| `/aios-operate` | `OPERATE` | 運用、監視、改善、障害、変更要求を管理する | `/aios-next` |
| `/aios-next` | any | 次に実行すべきコマンドを判断する | state dependent |
| `/aios-status` | any | 現在 State、Gate、Task、Handoff を確認する | `/aios-next` |
| `/aios-resume` | `PAUSED` | 中断状態から安全に再開する | `/aios-next` |
| `/aios-autopilot` | any | session停止後も安全な作業を継続しreportを残す | `/aios-status` |
| `/aios-lane` | `SETUP`以降 | 複数開発をworktreeへ分離して統合する | `/aios-status` |
| `/aios-pause` | any | 安全に中断し、再開条件を記録する | `/aios-notify` |
| `/aios-notify` | any | 人間に判断を渡す通知を作る | `/aios-resume` |

## Claude Code の役割

Claude Code は Tech Lead です。

- State と Gate を読んで進行を判断する
- Vision、Design、Spec、Task、Review 観点を整理する
- Codex に渡す作業を明確にする
- Human Handoff を作る
- Change Request を構造化する

Claude Code は Human Approval を代行しません。

## Codex に委譲できる作業

Codex は Implementation Worker です。

- ファイル編集
- YAML / Markdown 整形
- テスト追加
- テスト実行
- 実装
- Review 指摘修正
- Secret 風文字列の簡易スキャン

Codex に委譲する前に、Spec Freeze と Task の対応を確認します。

## Human Stop Points

以下を見つけたら作業を止め、`.ai/HUMAN_HANDOFF.md` を更新して `/aios-notify` を使います。

- 本人確認
- 課金
- CAPTCHA
- 2FA
- 規約同意
- Secret 入力
- 本番 Deploy
- 本番データ削除
- 外部公開
- 法務、契約、プライバシー判断

## State 別の次コマンド

- `NEW`: `/aios-vision`
- `VISION`: `/aios-design` after Gate 1
- `DESIGN`: `/aios-freeze` after design draft
- `DESIGN_REVIEW`: `/aios-freeze` after Gate 2
- `FROZEN`: `/aios-setup` after Gate 3
- `SETUP`: `/aios-develop` after Gate 4
- `DEVELOPMENT`: `/aios-review` after Gate 5
- `REVIEW`: `/aios-deploy` after Gate 6
- `DEPLOY`: `/aios-operate` after Gate 7
- `OPERATE`: `/aios-next` or `/aios-vision` for new change
- `PAUSED`: `/aios-resume`
- `DONE`: `/aios-status` or `/aios-vision` for a new cycle

## 完了時に必ず残すこと

- 何を実行したか
- どの State / Gate に関係するか
- 更新したファイル
- Human Approval が必要か
- 次の推奨コマンド
- Secret 実値を記録していないこと
