# Known Issues

<!-- AIOS:SESSION-CONTINUITY:START -->
## AIOSが検出した未完了候補

- 更新: 2026-07-30T21:07:50.191Z

- なし
<!-- AIOS:SESSION-CONTINUITY:END -->

## 継続課題

### 1. 料金方針 —— 解決済み（2026-07-29 20:35）

オーナー判断により **無償（制作費は請求しない）** で確定し、森下様へ LINE で回答済み。
今後「費用はどうなっている？」と問われた場合は、この方針を前提に応答してよい。
ただし**新規案件・継続運用の費用を新たに約束することは引き続き自動判断の対象外**。

補足（送信環境）: LINE.app のウィンドウは開いていても**別のトークを表示している**ことがある
（2026-07-29 は別件のトークが前面だった）。プロセス起動＝送信可能ではないので、
必ず検索欄から相手を開き直し、ヘッダー名と直前メッセージを画面で照合してから入力すること。
主要チャットウィンドウ自体が閉じている場合は AX ウィンドウ 0 個で判別できる。

### 1-b. いらすとや素材は「1制作物あたり20点まで無料」

21点以上使うと有償ライセンスが必要になる。現在 **10点** 使用。
イラストを追加するときは必ず `images/CREDITS.md` の使用点数を数え直すこと。
未使用素材をリポジトリに置いたままにすると「素材の再配布」とみなされうるため残さない。

### 1-c. ヒーロー動画は海外のストック映像のまま —— 森下様側（nami さん）が対応する方向

`videos/hero-video-1.mp4`（およびコンポーネント内の pixabay / pexels の動画URL）は画像刷新の
差し替え対象外だった。2026-07-30 に森下様から「冒頭動画も nami ちゃんに投げていい？」の打診があり、
当方は 9:11 に承諾済み。

**したがって当方からヒーロー動画を先回りで差し替えてはいけない**（同じ箇所を二重に触ると
森下様側の作業と衝突する）。nami さんから素材や依頼が届いたら、その時点で差し替えを引き受ける。

### 2. `git remote` の URL に個人アクセストークンが平文で埋め込まれている

トークンのローテーションと SSH 接続への移行を推奨。値は本ドキュメントに記載しない。

### 3. 非www → www が 307（一時）リダイレクト

canonical / sitemap / JSON-LD は非wwwを指しており表記が不一致。実害は小さいが、
301（恒久）化とホスト表記の統一が望ましい。ホスティング側の設定変更が必要。

### 4. LINE 送信時は必ずクリップボード貼り付け＋送信直前の相手名検証を行う

1文字ずつ入力する方式は、フォーカスが別トークへ移ると誤爆する（2026-07-28 に発生、未送信で復旧済み）。
貼り付け方式に加え、Enter を押す直前にトーク相手名を画面上で検証してから送信すること。

**送信キーは CGEvent では効かない。** CGEvent で作った Return は Cmd+Return も含めて
入力欄に改行が入るだけで送信されない（2026-07-29 確認）。送信は
`osascript -e 'tell application "System Events" to key code 36'` を使う。
同じ CGEvent でもクリック・ピクセルスクロール・Cmd+V（key 9 + flag 1048576）は正常に効くので、
キー入力だけ System Events に切り替えればよい。誤って入った改行は key code 51 で削除する。

### 5. LINE検索結果から対象トークを開く操作が不安定

2026-07-30 09:27 JST に確認。検索欄へ「森下」を入れると左ペインに「森下 知幸」は表示されるが、
検索結果行のクリックや `AXPress` が goodN のメッセージ検索結果へ遷移することがある。
送信前に右ヘッダーが対象者名へ変わったことをスクリーンショットで確認できない場合は送信しない。
今回の追加返信「あと、冒頭動画の指示も送ってください！」は、2026-07-30 09:32 JST に右ヘッダー
「森下 知幸」と本文を画面確認して送信済み。

2026-07-30 09:32 JST の追記: `cliclick` で通常クリックすると座標がずれて別トークを開くことがあった。
別トークが開いた場合でも入力・送信はせず、必ず右ヘッダーを見てから続行すること。

**`pbcopy` はこの環境ではサイレントに失敗する**（`pbpaste` が空を返す）。クリップボードへの
書き込みは `osascript -e 'set the clipboard to "…"'` を使い、`osascript -e 'get the clipboard'`
で書けたことを確認してから貼り付けること（2026-07-30 に再確認）。

### 6. 同じ LINE 通知を Claude と Codex の両セッションが並行処理する

2026-07-30、森下様の「ありがとう」通知を Codex セッション（`codex:019fb058`）が先に処理し、
9:14 に返信を送信していた。こちらは同時刻に返信を作成し、**貼り付け済みの状態から送信直前の
キャプチャで気づいて取り消した**（入力欄クリック → Cmd+A → key code 51 で消去）。

対策は 2026-07-29 と同じ。**Enter を押す直前にスレッド最下部を必ずキャプチャし、
自分側（緑・右寄せ）の新しい吹き出しが増えていないかを確認する。**
`docs/CURRENT_STATE.md` の AIOS 継続ブロックに他セッションの `元セッション:` が入っていることも
判断材料になる（`codex:` 始まりなら Codex 側が同じ案件を触っている）。

### 1-c（更新）. ヒーロー動画 —— 森下様側で作成される（2026-07-30 21:15 確定）

当方が A2E Kling で作った v5（`videos/hero-video-2026-07.mp4`、ブランチ
`feature/hero-video-2026-07`）は**採用されなかった**。2026-07-30 21:15 の LINE で
森下様が「動画はこちらで作成してみます」とご判断。

- 本番の冒頭動画は従来の `videos/0921(3).mp4` のまま。**当方から差し替えない**
- 森下様から動画が届いたら、`videos/` へ置いて `hero.html` と `hero.js` の**両方**の
  src を差し替える（1-d 参照）
- v5 は保険としてブランチに残置。生成結果の A2E 側 URL は 3日で失効するが、
  リポジトリ内のファイルは残る

2026-07-31 03:57 追記: オーナー指示により、当方の **Veo 版（7秒ループ）を森下様へ LINE 送付済み**。
「森下様の Gemini 版を優先します」と明記しているため、**先方から採用のご返答があるまで
main へマージしない**。返答がないまま先方の動画が届いた場合は、そちらを優先する。

**2026-07-31 05:36 追記 —— 本項は解決。冒頭動画は本番反映済み。**
森下様が 5:13 に「直近で送信してもらった動画をホームページの冒頭動画にしてください。
繰り返し流れるように設定してください。」とご指示。**Seedance 版（修正2点は未反映）**を
`main` へ反映し、本番へ push 済み（`videos/hero-video-seedance-2026-07-31.mp4`）。
Veo 版・Kling v5 は不採用でブランチ残置。以降この項は「先方作成待ち」ではない。

### 1-g. 修正2点を反映した Seedance v2 は未送付のまま保留中

森下様の修正2点（①冒頭を青空の雲の上から下降してカフェへ ②カフェの店員と客の位置を逆に）を
反映した v2 が完成しているが、**5:13 のご指示が「直近で送信した動画（＝修正前）を使う」だった**ため
本番には入れていない。5:43 の完了報告で「ご希望なら送付して差し替えます」と伝えて返答待ち。

- 保全先: ブランチ `feature/hero-video-seedance-v2-corrections`（`bc3d5b8`）
  / `videos/hero-video-seedance-v2-corrections-2026-07-31.mp4`（7,473,166 bytes / 1920x1080 / 11.041秒 / 音声なし）
- LINE 送付用プレビュー（前面文言焼き込み・1280x720・2.8MB）は `/tmp/seedance-v2-preview-for-line.mp4`
  にあるが、**`/tmp` は消える**。送付時に残っていなければ、保全済みの本体から作り直すこと

**プレビュー再生成コマンド（2026-07-31 05:51 に実行して出力を目視検証済み）**:
`/tmp` が消えていてもこれで作り直せる。フォントは `Hiragino Sans GB.ttc` を使うこと
（パスに空白があるので `fontfile=` の値はクォートせずそのまま書く。日本語が豆腐にならないことを
生成後にフレーム抽出して必ず目視すること）。

```bash
git cat-file blob feature/hero-video-seedance-v2-corrections:videos/hero-video-seedance-v2-corrections-2026-07-31.mp4 > /tmp/_v2_master.mp4

ffmpeg -y -i /tmp/_v2_master.mp4 \
 -vf "scale=1280:720,drawtext=fontfile=/System/Library/Fonts/Hiragino Sans GB.ttc:text='みんなの笑顔のために。':fontcolor=white:fontsize=64:x=(w-text_w)/2:y=h/2-90:shadowcolor=black@0.6:shadowx=3:shadowy=3,drawtext=fontfile=/System/Library/Fonts/Hiragino Sans GB.ttc:text='あなたの成功を支えます。':fontcolor=white:fontsize=64:x=(w-text_w)/2:y=h/2+10:shadowcolor=black@0.6:shadowx=3:shadowy=3" \
 -an -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 23 -movflags +faststart /tmp/seedance-v2-preview-for-line.mp4
```

`ffmpeg` は `/opt/homebrew/bin/ffmpeg`（PATH に無いことがある）。`crf 23` で約5.2MB になる。
既存の 2.8MB 版はより高い crf で作られているが、LINE 送付には 5MB 台でも問題ない。
**この焼き込み文言は確認用**で、実サイトでは映像に文字を入れず `hero.html` / `hero.js` 側で重ねる。

### 11. コミットしただけでは本番に出ない —— セッション終了で push 漏れが起きる

2026-07-31 に発生。前セッションは hero の動画差し替えを `88723c7` でコミットしたが
**push しないまま終了**し、`main...origin/main [ahead 2]` の状態で引き継がれた。
本番（Vercel）は `origin/main` を見るため、**ローカルの作業ツリーが「正しく」見えていても
本番は旧内容のまま**という食い違いが生じる。

引き継ぎ時は必ず次を確認すること。

- `git status --short --branch` の `[ahead N]` を見る。0 でなければ本番未反映
- 本番の実体を `curl` で直接確認する（例: `curl -s <URL>/components/hero/hero.js | grep mp4`）
- **`hero.js` は実行時に `hero.html` の video を差し替える**ため、`hero.html` だけ見ても
  実際に再生される動画は分からない（KNOWN_ISSUES 1-d と同根）

### 12. macOS には `timeout` コマンドがない

ヘッドレス Chrome が固まる件（項目 9-b / メモリ）の対策で `timeout 90 chrome …` と書くと
**exit 127（command not found）**になり、検証したつもりで何も実行されていない状態になる。
`timeout` は GNU coreutils（`gtimeout`）側。素の macOS では次のように自前で見張る。

```bash
chrome --headless=new … --screenshot=/tmp/out.png "URL" & CPID=$!
for i in $(seq 1 60); do [ -s /tmp/out.png ] && break; kill -0 $CPID 2>/dev/null || break; sleep 1; done
kill -9 $CPID 2>/dev/null
```

なお **`--dump-dom` は `--screenshot` より確実**で、実際に読み込まれた動画 src を
文字列で取れる。見た目のフレームから動画を推測するより先に DOM を確認すること。

2026-07-31 03:30 追記: 森下様より「動画はGeminiで作った方がいいっぽい」。
**制作主体は引き続き森下様側（Gemini/Veo）**。当方は受領後の差し替えのみ担当する。
受領時の想定仕様は MP4（H.264）／10〜15秒／音声なし／横1920×1080。
文字入れなしで受け取ること（前面文言は `hero.html` / `hero.js` 側で重ねるため、
映像に焼き込まれていると二重になる）。

### 1-e. A2E の Veo は公開ドキュメントに載っていない（実測した契約）

`api.a2e.ai` の公開ドキュメントには Kling / Wan / Veo の記載がなく、`docs.a2e.ai` は存在しない。
実測した契約は以下（2026-07-31 確認）。

- `POST https://a2e.ai/api/v1/veoVideo/start` / `GET https://a2e.ai/api/v1/veoVideo/{taskId}`
- 必須 `prompt`。`model` は `veo3` / `veo3_fast` のみ、`aspect_ratio` は `16:9` / `9:16` / `auto` のみ
- **尺は指定できず常に 8.000秒**。1280x720 / 24fps、**音声トラック付きで返る**ので Web 用途では除去する
- 存在しないエンドポイントは HTML の 404 を返し、実在するものは JSON の 400 を返す。
  この差でエンドポイントの有無を**課金なしに**判定できる（`userVeo` などは 404、`veoVideo` は 400）

ループ用のクロスフェードは、末尾1秒を**冒頭に重ねて `fade=t=out:alpha=1`**（フェードアウト）にする。
`t=in` にすると冒頭が別シーンへ変化するだけでループの継ぎ目は消えない。

### 1-f. 動画生成エンジンは admin 側に実装済み。AIOS で複製しない

`SITE/ADMIN/src/lib/studio/video-engines.ts` に15エンジン（i2v / Veo 3.1 / Kling 3.0 / Kling 2.6 /
Kling Omni / Seedance 1.5 Pro / **Seedance 2.0** / HappyHorse 1.1 / Wan 2.6 / Wan 2.7 / Wan R2V /
Sora 2 Pro / Hailuo / Grok Imagine 1.5）が実測コイン単価つきで定義されている。
morishitax 側で新たに A2E を直叩きする前に、必ずこのファイルの契約を確認すること。

- 既定は `DEFAULT_VIDEO_ENGINE = 'i2v'`（本人維持が最も強い）
- `Wan 2.7` は `superAdminOnly`。a2e 側で VIP / Max アカウントが必要
- Seedance 2.0 は `duration <= 4` が 400 になる（5〜12秒）。1080p / 4k は `standard` モデルのみ
- **Sora 2 は 2026-04-26 に deprecated（API 2026-09-24 停止）**。新規採用しない

### 9-b. ヘッドレス Chrome は幅 500px 未満のウィンドウを作れない

`--window-size=390,844` を渡しても `document.documentElement.clientWidth` は 500 になる。
390px のスマホ幅で横溢れを測るときは、**390px 幅の iframe を持つラッパー HTML を用意し、
`iframe.contentDocument` 側の `scrollWidth` / `clientWidth` を測る**こと。
メディアクエリは iframe のビューポート幅で正しく効く。

なお計測用に innerHTML で `<pre>` を差し込むと、その `<pre>` 自体が横に伸びて
`scrollWidth` を汚染する。計測結果はラッパー側（外側の document）へ出力すること。

### 10. LINE への貼り付けは1回目が画面に出ないことがある（二重貼り付けに注意）

2026-07-30 21:17 に発生。入力欄をクリック直後に Cmd+V を送った1回目は、
直後のスクリーンショットではプレースホルダ「メッセージを入力」のままに見えた。
「効いていない」と判断して2回目を送ったところ、**同じ本文が2つ連結された状態**になった。

対策: 貼り付け後は 1 秒ほど置いてからキャプチャする。二重になっていたら
Cmd+A（key code 0 using command down）→ key code 51 で全消しして貼り直す。
送信前に必ず本文が1通分だけであることを目視すること。
