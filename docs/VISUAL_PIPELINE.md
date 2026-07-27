# Visual Pipeline (this project)

Visual Designer 工程。正本: AIOS `docs/VISUAL_PIPELINE.md`。既定 Provider: ChatGPT Images。

**UI 実装前に必ず ① Design Board ② 全ページ Mockup を生成する。Mockup が無いページは実装しない。**

## 進捗
- [ ] UI Flow Board（全体遷移図）: `design/assets/flow-board.png`
- [ ] Design Board（全体1枚）: `design/assets/design-board.png` → Design Board Freeze
- [ ] Page Mockups（Site Map の全ページ）: `design/assets/<page>.png` → Page Freeze
- [ ] Human Review（`docs/DESIGN_BOARD_REVIEW.md` / `docs/PAGE_FREEZE_REVIEW.md`）

プロンプト: `docs/UI_DESIGN_BOARD_PROMPT.md` / `docs/PAGE_IMAGE_PROMPTS.md`。
Browser Automation（Computer Use）で操作。secret / 個人情報を入れない。
軽微事項（セクション順・曜日・CTA）は自動決定 → `docs/DECISIONS.md`。
