# Design Reference Manifest

選択済みデザイン画像をClaude Designへ渡す上流入力として固定する。Artifact のURLだけでは
証跡にならない。各画像を `design/assets/` に保存し、ページごとに記録する。
React実装の正本は、この後に生成・browser表示・Human承認するStandalone HTML。

## Frozen references

| Page / route | Reference image | Width × height | SHA-256 | Human approval |
| --- | --- | --- | --- | --- |
| PLACEHOLDER | `design/assets/PLACEHOLDER.png` | PLACEHOLDER | PLACEHOLDER | pending |

## Rules

- Claude Designはこの表の画像を入力にStandalone HTMLを生成する。
- 画像、寸法、ハッシュ、対象ページのいずれかが違えば比較を開始しない。
- HTML承認は`.ai/HTML_FREEZE.yaml`に記録し、その後の差し替えはChange RequestとHuman再承認が必要。
