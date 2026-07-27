# Cross-machine Resume

正本: AIOS `docs/CROSS_MACHINE_RESUME.md`。

Pull後は通常作業の前に必ず実行する。

```bash
apos machine-bootstrap . --install
```

- [ ] default browser profileがlocal Chromeへ再bind済み
- [ ] dependencies復元済み
- [ ] required env keysがlocalに存在（値は表示・commitしない）
- [ ] required service loginを実browserで再確認済み
- [ ] `apos machine-bootstrap-status .`が`ready_to_resume: true`
- [ ] `.ai/PROJECT_STATE.yaml`のStateから継続
