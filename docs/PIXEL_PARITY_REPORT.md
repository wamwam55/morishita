# Pixel Parity Report

- Status: passed (2026-08-11)
- Required threshold: **0 changed pixels**
- Evidence: `.ai/VISUAL_PARITY.yaml`

| Page | Viewport | Frozen HTML screenshot | App screenshot | Changed pixels | Diff | Result |
| --- | --- | --- | --- | ---: | --- | --- |
| CR-001 料金案内 | 1440×5000 | `.ai/visual-parity/pricing-reference-1440.png` | `.ai/visual-parity/pricing-actual-1440.png` | **0** | `.ai/visual-parity/pricing-diff-1440.png` | passed |
| CR-001 料金案内（mobile） | 500×3000 | `.ai/visual-parity/pricing-reference-500.png` | `.ai/visual-parity/pricing-actual-500.png` | **0** | `.ai/visual-parity/pricing-diff-500.png` | passed |

全FrozenページについてHuman承認済みStandalone HTML renderingと最終アプリを比較する。
1ピクセルでも違えば`needs_fix`。差分画像を見て修正し、0になるまで再撮影・再比較する。

## CR-001 検証メモ

- Freeze固定ソース: `design/html/pricing-cr001.html` および同ディレクトリのHTML/CSS/JS
- 実装比較ハーネス: `.ai/visual-parity/pricing-app-harness.html`
- ImageMagick `compare -metric AE`: PC / mobile とも `0 (0)`
- Chrome Profile 1の実アプリで法人ボタンを操作し、`tab-hojin` がactiveになることを確認
- 390px実測: page `scrollWidth=390` / `clientWidth=390`、料金セクション `scrollWidth=360` / `clientWidth=360`
