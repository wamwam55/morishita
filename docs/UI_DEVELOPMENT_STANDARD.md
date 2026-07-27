# UI Development Standard (this project)

このプロジェクトの UI 開発は AIOS の標準に従う（正本: AIOS `docs/UI_DEVELOPMENT_STANDARD.md`）。
**UI 開発 = React を書くこと、ではない。** 下記 6 ステップを必ず通す。

## 進捗トラッカー

- [ ] 1. 全体 Design Board 作成 → 人間確認（`docs/DESIGN_BOARD_REVIEW.md`）→ Freeze 対象
- [ ] 2. 主要ページ UI 画像生成（`design/assets/`）※主要ページ画像なしで実装しない
- [ ] 3. Claude Design 変換 → 単一 HTML（`design/html/`）※変換前に React 実装しない
- [ ] 4. HTML 取り込み・解析 → サンプル素材を自動配置（public/assets or src/assets）
- [ ] 5. 実装変換（Next.js/React/Tailwind/component）→ データは repository 層へ分離
- [ ] 6. Review（`docs/UI_REVIEW_CHECKLIST.md`）→ Freeze 違反は修正

## このプロジェクトの成果物パス

- Design Board 画像: `design/assets/`
- ページ画像: `design/assets/`
- 単一 HTML（中間成果物・保存必須）: `design/html/`
- サンプル素材: `public/assets/` / `src/assets/`
- 判断ログ: `docs/DECISIONS.md`
- レビュー: `docs/DESIGN_BOARD_REVIEW.md` / `docs/UI_REVIEW_CHECKLIST.md`

## 守るルール

1. UI 実装前に Design Board 必須（未承認で実装しない）
2. 主要ページ画像なしで UI 実装しない
3. Claude Design 変換前に React 実装へ進まない
4. 単一 HTML は中間成果物として保存する
5. React 化時はデータ取得を分離（repository 層・CMS 化容易に）
6. サンプル素材は自動配置方針（`ASSET_PLACEMENT_POLICY.md`）に従う
7. 実装後は元画像との UI レビュー必須

## 適用外（省略可）
- 軽微な内部管理画面 / CLI / API のみ。省略時は理由を `docs/DECISIONS.md` に残す。迷ったら必須側。

プロンプト雛形: `docs/PAGE_IMAGE_PROMPTS.md` / `docs/CLAUDE_DESIGN_PROMPT.md` / `docs/UI_DESIGN_BOARD_PROMPT.md`。
