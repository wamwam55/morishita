# Concurrent Development Lanes

複数機能を同時開発するときは、同じworking treeで複数Agentを動かさず`apos lane create`を使います。

Claude Codeでは`/aios-lane create <objective>`だけを入力します。project pathは現在のsessionから、Lane名はobjectiveから自動決定します。Humanが名前を固定したい場合だけ`--name <lane>`を指定します。

- branch: `codex/lane/<name>`
- worktree: project隣接の`<project>.aios-lanes/<name>`
- report: `.ai/lanes/<name>/AUTOPILOT_REPORT.md`
- port: Laneごとの`AIOS_LANE_PORT_BASE`（3100から20刻み）
- registry: `.ai/LANES.yaml`
- aggregate report: `.ai/LANE_REPORT.md`

`lane ready`でclean/test/conflictを検査し、`lane merge`でmainへ統合・再testします。Human Stop Point、Freeze、secret、production approvalはLaneでも共通です。
