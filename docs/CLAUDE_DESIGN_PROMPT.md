# Claude Design Prompt

各ページ画像を **Claude Design** に渡し、**単一 HTML** として再現させるためのプロンプト雛形。
Browser / Computer Use で画像を渡す。正本: AIOS `docs/CLAUDE_DESIGN_CONVERSION.md`。
secret / 個人情報 / 実データは入れない。

## 変換プロンプト（画像 1 枚ごと）

```
添付の UI 画像を、単一の HTML ファイル（HTML + CSS）として忠実に再現してください。

要件:
- 1ファイルで完結（CSS はインライン or 同一ファイル内 <style>）。外部依存を最小化。
- レイアウト・配色・余白・タイポ・コンポーネント構造を画像に忠実に。
- 画像/写真/アイコンはサンプル(プレースホルダ)で配置し、参照パスを明示。
- テキストは画像どおり（日本語）。
- レスポンシブは <必要なら: モバイル/デスクトップ> を考慮。
- 個人情報・実在の連絡先・secret・API key は入れない。

出力:
- 単一 HTML 本文。
- 使用したサンプル素材の一覧（ファイル名と用途）。
```

## 取り込み時の保存

- HTML: `design/html/<page>.html`（**中間成果物として保存・捨てない**）
- サンプル素材: `design/html/assets/`（後で `public/assets` or `src/assets` へ自動配置）

## 次
- `design/html/*.html` を AIOS `docs/HTML_TO_REACT_WORKFLOW.md` に従い React/Next.js へ分解。
- データ表示は repository 層へ分離。実装後は `docs/UI_REVIEW_CHECKLIST.md` で元画像と照合。
