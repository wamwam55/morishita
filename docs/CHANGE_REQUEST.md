# Change Request

Freeze 後の変更提案です。

## CR-001: サービス料金案内の顧問契約導線・会計注記の修正

- Status: approved / implemented / published and verified
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
- Human Approval: approved（CR-001と各Freezeの明示承認）
- Approved by: Human Owner（チャットユーザー）
- Approved at: 2026-08-11T01:57:01+09:00
- Implementation: `components/pricing/pricing.html` / `components/pricing/pricing.css`
- Publication: published to production (`d6b87ed`, verified 2026-08-11 02:09 JST)

## CR-002: 「会計処理の目安」の削除

- Status: approved / implemented / published and verified
- Requested by: 森下 知幸（LINE、2026-08-11 05:28 JSTに確認）
- Target: `design/html/pricing-cr001-fragment.html`、`design/html/pricing-cr001.css`、`components/pricing/pricing.html`、`components/pricing/pricing.css` の「会計処理の目安」ブロック
- Reason: ホームページから「会計処理の目安」を削除するよう依頼があったため。
- User Impact: 料金案内から、会費・消耗品費・減価償却に関する3項目の目安表示がなくなる。
- Provider Impact: 税務・会計上の目安をホームページ上で案内しなくなる。
- Admin Impact: 承認済みDesign Freeze／Spec Freezeを再承認し、公開前に削除後の表示を確認する必要がある。
- Design Impact: 料金表と「オプション料金／サービス提供条件」の間にある案内ブロックがなくなり、ページ全体の縦寸法が短くなる。
- Spec Impact: CR-001のFreeze Target「会計3注記」とUI Review Checklist「3項目の会計処理の目安」を削除対象へ変更する。
- Implementation Impact: Standalone HTML正本と実装HTMLから案内ブロックを削除し、正本と実装CSSから専用スタイルを削除する。1440px／500pxの比較画像とParity証跡を再生成する。
- Risk: Freeze承認なしに変更すると、承認済みHTML正本と実装の0-pixel parityおよび監査証跡が無効になる。
- Alternatives: ブロックを非表示にしてコードを残す案もあるが、不要な公開文言を残存させるため採用しない。
- Human Owner Approval: approved（CR-002と更新後Freezeの明示承認）
- Approved by: Human Owner（チャットユーザー）
- Approved at: 2026-08-11T08:50:00+09:00
- Implementation: Standalone HTML正本と実装HTML/CSSから対象ブロック・専用CSSを完全削除
- Verification: 対象文言0件、法人料金タブ切替正常、390px横オーバーフローなし、1440px／500pxとも0 changed pixels
- Publication: published to production (`9633c92`, verified 2026-08-11 09:33 JST)

## Rule

承認前に Freeze 済み成果物を変更しない。
