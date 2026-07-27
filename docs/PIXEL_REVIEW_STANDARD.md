# Pixel Review (this project)

正本: AIOS `docs/PIXEL_REVIEW_STANDARD.md`。実装の正本はHuman承認・Freeze済みStandalone HTML。

## 合格条件

- [ ] `.ai/HTML_FREEZE.yaml` の全ページを比較
- [ ] 参照画像と撮影画像の幅・高さが一致
- [ ] Standalone HTML版の `changedPixels` が0
- [ ] 最終アプリ版の `changedPixels` が0
- [ ] reference / actual / diffを `artifacts/visual-review/` に保存
- [ ] `docs/PIXEL_PARITY_REPORT.md` と `.ai/VISUAL_PARITY.yaml` に証跡を記録

```bash
apos pixel-compare <reference.png> <actual.png> --diff <diff.png>
```

最終アプリとFrozen HTML renderingが1ピクセルでも違えば未完成。
PNG案だけを承認してHTML Freezeを省略すること、古いHTMLを使うことは禁止。
