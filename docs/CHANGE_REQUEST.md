# Change Request

Freeze 後の変更提案です。

## CR-001: サービス料金案内の顧問契約導線・会計注記の修正

- Status: proposed
- Target: `components/pricing/pricing.html` の「サービス料金のご案内」セクション
- Reason: 森下 知幸氏から、個人・法人顧問契約の導線と会計上の注記について修正依頼があったため。
- User Impact: 個人顧問契約と法人顧問契約の料金導線が分かりやすくなり、会費・消耗品費・減価償却の判断基準を料金案内上で確認できる。
- Provider Impact: 顧問契約の種別に応じた案内先と、税務・会計上の説明内容が明確になる。
- Admin Impact: 料金表示および説明文の更新内容を承認し、公開前に法務・税務表現を確認する必要がある。
- Design Impact: 料金カードのボタン文言・遷移先の変更と、料金表付近への注記追加により縦方向のレイアウトが変わる。
- Spec Impact: 個人顧問契約の「料金表をみる」を個人顧問契約の料金表へ、法人顧問契約の「無料相談する」を「料金表をみる」に変更して法人顧問契約の料金表へ遷移させる。会費は1人当たり10,000円以下を目安、消耗品費は年間300万円までかつ単価40万円未満（令和8年3月以前は30万円）、減価償却は原則として固定資産へ計上する旨を追記する。
- Implementation Impact: `components/pricing/pricing.html` の法人カードを `data-tab-link="hojin"` ボタンへ変更し、会計注記ブロックを追加する。必要に応じて `components/pricing/pricing.css` に注記用スタイルを追加し、`components/pricing/pricing.js` の既存タブ遷移で動作確認する。
- Risk: 税務上の適用条件・例外・時期の表現が不正確な場合、利用者へ誤解を与える。注記追加によりFreeze対象デザインとのピクセル差分が発生する。
- Alternatives: 税務説明を料金案内へ直接掲載せず、監修済みの別ページまたはFAQへリンクする。
- Human Approval: pending（Design Freeze・Spec Freeze未承認のため、実装前承認が必要）
- Approved by:
- Approved at:

## Rule

承認前に Freeze 済み成果物を変更しない。
