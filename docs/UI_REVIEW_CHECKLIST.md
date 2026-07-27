# UI Review Checklist

## Frozen source of truth

- `docs/DESIGN_REFERENCE_MANIFEST.md`
- `design/assets/` の承認画像
- `design/html/` のHTML Freeze済みソース

## Exact visual gate

- [ ] 全Frozenページを同じviewportと寸法で撮影
- [ ] reference / actual / diffが保存済み
- [ ] HTML版と最終アプリ版のchangedPixelsが全件0
- [ ] `.ai/VISUAL_PARITY.yaml` の件数がfrozen page数と一致
- [ ] `.ai/VISUAL_PARITY.yaml.status` が`passed`

## Functional and implementation gate

- [ ] 導線、CTA、フォーム、レスポンシブが仕様どおり
- [ ] データ取得と表示コンポーネントが分離
- [ ] build / typecheck / testsが成功
- [ ] Freeze逸脱、secret、個人情報混入がない

1ピクセルでも差がある場合は`needs_fix`。視覚差分に軽微例外は設けない。
