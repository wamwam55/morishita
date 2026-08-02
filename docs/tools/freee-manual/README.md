# freee会計 かんたん操作マニュアル — 生成スクリプト

森下様のご依頼（2026-08-03 06:18 LINE）で作成した、顧問先向け freee会計 操作マニュアルの
再生成用スクリプト一式。**修正依頼が来たら、該当の `build_partN.py` を直して再生成する。**

## 生成方法

```bash
python3 -m venv /tmp/_docvenv && /tmp/_docvenv/bin/pip install python-docx
cd docs/tools/freee-manual && /tmp/_docvenv/bin/python assemble.py
# → ~/Downloads/freee会計_かんたん操作マニュアル_2026-08.docx
```

PDF が必要なときは Pages で開いて書き出す（この Mac に LibreOffice / pandoc / Word は無い）。

```bash
osascript -e 'tell application "Pages" to set d to open (POSIX file "…docx" as alias)' \
          -e 'tell application "Pages" to export d to POSIX file "…pdf" as PDF'
```

## ファイル構成

| ファイル | 内容 |
|---|---|
| `build_part1.py` | 共通部品（スタイル・表・ポイント/注意ボックス）＋表紙・第0章・第1章 |
| `build_part2.py` | 第2章 自動で経理／第3章 自動登録ルール／第4章 会計データの確認 |
| `build_part3.py` | 第5章 スマホでレシート／第6章 勘定科目 |
| `build_part4.py` | 第7章 消込（債権）／第8章 口座振替 |
| `build_part5.py` | 付録A 月次チェックリスト／B 用語集／C Q&A／D 調べ方 |
| `assemble.py` | 全体を組み立てて `~/Downloads` へ保存 |

成果物は 41ページ / 34表。フォントは **游ゴシック**（Windows の Word で標準。この Mac には
未インストールのため、ローカルのプレビューではヒラギノに置換されて表示される）。

## 内容の根拠

画面名・ボタン名は **freee公式ヘルプ（support.freee.co.jp）を2026-08-03に実取得して確認済み**。

- `support.freee.co.jp` は通常の HTTP 取得が **403**。本文は Zendesk Help Center API で取れる:
  `https://support.freee.co.jp/api/v2/help_center/ja/articles/{記事ID}.json`
- **2026年のメニュー構成は刷新されている。** 旧「設定」「取引」「レポート」メニューは存在せず、
  `［取引入力］`『［請求・入金］』『［発注・経費・支払］』『［会計帳簿］』『［分析・レポート］』
  『［マスタ・口座］』『［入力効率化］』『［その他設定］』に再編されている
- 「自動で登録／候補として提示」という名称は存在しない。正しくは **「〜を登録する／〜を推測する」**
- 消込タブの正式名は **［未決済取引の消込］**（「取引の消込」ではない）
- freee の「口座振替」は**自社口座間の資金移動**のこと。銀行引落による経費支払・売掛金回収は
  この機能ではなく通常の取引登録・消込で処理する（マニュアル 8-1 で明示的に注意喚起）
- freee電子証明書連携アプリは **2022年11月末で提供終了**。マニュアルに項を設けてはいけない

## 意図的に空欄にしてある箇所

付録D「お問い合わせ先」の表（ご担当・電話・メール・備考）。事務所側で記入いただく前提。
