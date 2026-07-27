# UI Provider Abstraction (this project)

AIOS v0.3 の役割ベース Pipeline を使う。正本: AIOS `docs/UI_PROVIDER_ABSTRACTION.md`。
**AIOS は特定 AI に依存しない。** 役割の入出力契約を満たせば Provider を差し替え可能。

## このプロジェクトの Provider（既定・差し替え可）

| 役割 | 既定 Provider | 成果物 |
| --- | --- | --- |
| Visual Designer | ChatGPT Images | Design Board / Page Mockups（`design/assets`, `design/assets`） |
| Prototype Generator | Claude Design | 単一 HTML（`design/html`） |
| Implementation Engine | Claude Code | Next.js/React/Tailwind + Repository |

- Visual Designer / Prototype Generator は **Browser Automation（Computer Use）** から操作。
- 差し替える場合は入出力契約（画像 / 単一HTML / React+Repository）を満たすこと。
- Provider 選定・軽微事項は Auto Decision → `docs/DECISIONS.md`。Freeze と重大事項は人間。
