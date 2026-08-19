# Lane p — SEO/MEO対策（森下様LINE依頼 2026-08-19 17:33）

## 依頼内容（LINE / 森下 知幸 様 → ミカノス宛）

1. SEO対策でキーワードが空欄の状態だった。税理士業で引っかかるように対策する。
2. MEO対策として、Googleビジネスプロフィールの概要欄に、ホームページに合わせた自然な文章を
   700字程度で作成する。「税理士」「社会保険労務士」「感謝」「尊敬」「愛」を必ず含める。
3. その他に有効なMEO対策があれば提案する。

## 実施内容

### 1. SEO（コード変更）

| 対象 | 変更 |
| --- | --- |
| `index.html` | `<meta name="keywords">` 新規追加（税理士・地域・業務の27語） |
| `index.html` | `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">` 追加（従来なし） |
| `index.html` | `geo.region` / `geo.placename` / `geo.position` / `ICBM` 追加 |
| `index.html` | `og:site_name` 追加 |
| `philosophy.html` | `<meta name="keywords">` 追加、`robots` に `max-snippet:-1` 追加、geo 2件追加 |
| `index.html` / `philosophy.html` / `sitemap.xml` / `robots.txt` | 正規URLを apex → `www` に統一（計13か所） |
| `sitemap.xml` | `lastmod` を 2026-08-19 へ更新 |

**www 統一の根拠**: 本番は `https://morishita-tax.jp/` が 307 で
`https://www.morishita-tax.jp/` へ転送される（2026-08-19 確認）。
にもかかわらず canonical / og:url / JSON-LD の `@id`・`url` / sitemap / robots の Sitemap 行が
すべて apex を指しており、「正規URLが転送される」状態だった。評価分散とインデックス不安定の原因。

**metaキーワードの位置づけ**: Google は 2009 年に meta keywords を順位に使わないと公表済み。
SEOチェックツールの「キーワードが空欄」警告はこの欄なので依頼どおり埋めたが、
実際の順位対策は www 統一・robots 拡張・構造化データ・MEO 側が本体である旨を報告に明記した。

### 2 / 3. MEO 成果物

- `deliverables/2026-08-19/Googleビジネスプロフィール_概要文_700字.txt`
  （本文 682字／改行除く674字、指定5キーワードすべて含有、貼り付け範囲を点線で明示）
- `deliverables/2026-08-19/MEO・SEO対策のご提案_2026-08-19.txt`
  （実施済みSEOの説明＋MEO施策13件を効果順に整理）

## 検証

- JSON-LD: index 2ブロック / philosophy 3ブロック すべて `json.loads` 成功
- ローカル配信 `python3 -m http.server 3120`：index / philosophy とも HTTP 200
- ヘッドレスChrome `--dump-dom`：
  - philosophy 24,822バイト、`keywords` / `canonical(www)` を確認、本文「感謝」32件で欠落なし
  - index 128,441バイト、`keywords` を確認、セクション見出し12件でコンポーネント読み込み正常
- 変更は `<head>` 内メタ情報とURL文字列のみ。DOM構造・CSS・可視テキストは無変更のため、
  承認済み Design Freeze（対象＝pricingセクション）／HTML Freeze のピクセル同一性に影響なし。
- Freeze対象ファイル（`design/html/pricing-cr001.html`、`components/pricing/*`）は未変更。
  したがって Change Request は不要と判断した。

## 本番反映（2026-08-19 完了）

Human Owner の「統合後にmainへpushして本番反映して」を外部公開の明示承認として実行した。

- 統合はレーン統合ジョブが実施済みで、ローカル `main` は `3cf2ea1`（`04d2fcb` = lane p のマージコミット）。
- `git push origin main` により `5c9d58c` → `3cf2ea1`。`git ls-remote` で `origin/main=3cf2ea1` を確認。
- Vercel の自動デプロイ完了までポーリングし、本番 HTML に `meta keywords` が出現した時点で反映を確認。
- 本番実測（`https://www.morishita-tax.jp/`）:
  - `index.html` — keywords 27語、canonical / og:url / twitter:url すべて www、
    `robots` に `max-snippet:-1`、geo あり。**非www の絶対URLは 0 件 / www は 14 件**
  - `philosophy.html` — keywords 14語、canonical www、**非www 0 件**
  - `robots.txt` の `Sitemap:` が www、`sitemap.xml` は 200 で `<loc>` 2件とも www・lastmod 2026-08-19
- 実ブラウザ DOM（headless `--dump-dom` / 127,522 bytes）で回帰なしを確認:
  mp4 参照は `hero-video-seedance-v6-2026-08-01.mp4` の1件のみ、`data-tab-link="hojin"` 1件、
  「会計処理の目安」0件（CR-002 の削除は維持）、コンポーネント読み込みエラー 0 件。

## 未了・要判断

- **Google Search Console でのサイトマップ再送信**（`https://www.morishita-tax.jp/sitemap.xml`）。
  Google アカウントでの本人操作を伴うため未実施。Human Owner の指示があれば代行する。
- **森下様への本番反映完了報告（LINE）**: 前セッションで「反映完了後に改めて報告します」と
  お伝え済みだが、第三者への送信は Human Stop Point のため今回は送信していない。
  Human Owner の送信指示待ち。

## LINE 対応

- 17:33 森下様より依頼（冒頭「ミカノス」宛のため返信対象）
- 18:29 着手連絡を送信
- 18:41 ①SEO対策の完了報告を送信
- 18:41 ②Googleビジネスプロフィール概要文（690字・貼り付け用）を送信
- 18:42 ③MEO対策の最優先5件を送信
- 18:42 ③MEO対策の続き（6〜11）と代行の申し出を送信
- 送信後キャプチャで全5通とも全文欠落なしを確認済み
