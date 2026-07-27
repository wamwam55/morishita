# UI Design Board Prompt

UI 実装前に作る **Design Board**（全体遷移図 ＋ 1 枚のデザイン構成図）を、
**ChatGPT 画像生成** または **Claude Design** で生成するためのプロンプト雛形。
プロジェクト固有情報を埋めて使う。secret / 個人情報 / API key は書かない。

ルール: AIOS `docs/DESIGN_BOARD_POLICY.md` / `docs/UI_GENERATION_WORKFLOW.md`。

---

## 記入する情報（このプロジェクト）

- プロダクト名: PLACEHOLDER
- 対象ユーザー: PLACEHOLDER
- トーン / ブランド: PLACEHOLDER（例: 明るい / 信頼感 / スポーツ）
- 画面一覧: PLACEHOLDER（例: トップ / 料金 / 予約 / お問い合わせ / 完了）
- 主要導線（遷移）: PLACEHOLDER（例: トップ → 予約 → 完了）
- 主要 CTA: PLACEHOLDER（例: 「体験予約」）
- 必須セクション: PLACEHOLDER（例: ヒーロー / 特徴 / 料金 / CTA / フッター）

---

## 生成プロンプト（コピーして画像生成へ）

最初にChatGPT画像生成へ、以下の共通情報を使って2回依頼する。

- A: **Aggressive Refined** — 大胆な構成、強いタイポグラフィ、立体感、先進性、洗練された独自性。
  派手さだけにせず、可読性・アクセシビリティ・CTAの明快さを維持する。
- B: **Standard Trustworthy** — 王道の構成、安心感、直感的な階層、落ち着いた余白、明快なCTA。
  テンプレート然・凡庸・安っぽい見た目にはしない。

2案は情報量・必須セクション・CTA・デバイス寸法を同一にし、方向性だけを比較する。

```
あなたは UX/UI デザイナーです。次のプロダクトの「Design Board」を1枚の画像で作ってください。

# プロダクト
- 名称: <プロダクト名>
- 対象ユーザー: <対象ユーザー>
- トーン/ブランド: <トーン>

# 出力（1枚に両方を含める）
1) 全体遷移図: 画面遷移フロー。<画面一覧> を箱で並べ、矢印で <主要導線> を示す。
   エントリ・主要導線・出口が一目で分かること。
2) 1枚のデザイン構成図: 各画面（または主要セクション <必須セクション>）の
   俯瞰ワイヤーフレーム。セクション順・情報階層・主要CTA(<主要CTA>)の位置が分かること。

# 制約
- 実装用の高精細ではなく、人間が全体を1回で確認できる俯瞰図。
- テキストは日本語。読みやすい配置。ブランドトーンを色で示す。
- 個人情報・実在の連絡先・secret は入れない。
```

---

## 生成後にすること

1. A/B画像を`design/assets/directions/`へ規定名で保存し、会話内にも表示する。
2. `docs/DESIGN_DIRECTION_REVIEW.md`で比較し、人間が方向性を選ぶ。
3. 選択方向で画像を`design/assets/board-v1.png`に保存（版番号を付ける）。
4. `docs/DESIGN_BOARD_REVIEW.md`に人間確認を記録し、承認を得る。
5. 承認後に`apos freeze`でDesign Freeze。
6. `apos develop`でUI実装（Design Board承認済みのときだけ）。
