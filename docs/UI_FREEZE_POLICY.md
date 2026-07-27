# UI Freeze Policy (this project)

3 段階 Freeze（すべて人間確認）。正本: AIOS `docs/UI_FREEZE_POLICY.md`。

```
Design Board Freeze → Page Freeze → HTML Freeze
```

| Freeze | 対象 | 記録 |
| --- | --- | --- |
| Design Board Freeze | UI Flow Board ＋ Design Board | `docs/DESIGN_BOARD_REVIEW.md` |
| Page Freeze | 全ページ Mockup | `docs/PAGE_FREEZE_REVIEW.md` |
| HTML Freeze | 単一 HTML | `docs/HTML_FREEZE_REVIEW.md` |

## ルール
- Design Board Freeze 前に Page Mockup を量産しない。
- Page Freeze 前に HTML 化しない（Mockup 無いページは実装しない）。
- HTML Freeze 前に React 実装しない。
- Freeze 済みの変更は `docs/CHANGE_REQUEST.md` 経由で人間承認。
- 軽微事項は自動決定 → `docs/DECISIONS.md`。
