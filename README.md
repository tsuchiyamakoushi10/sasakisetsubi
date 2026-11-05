# 株式会社佐々木設備 コーポレートサイト

Next.js 16（App Router）＋ TypeScript ＋ Tailwind CSS v4。制作：X-EDGE。

## 開発

```bash
npm install
cp .env.example .env.local   # 必要に応じて編集
npm run dev                  # http://localhost:3000
npm run build && npm start   # 本番ビルドの確認
```

ローカルで `RESEND_API_KEY` が未設定のときは、フォームを送信してもメールは送らず、内容をサーバーログに出すだけになります。

## 環境変数（Vercel に設定）

| 変数 | 内容 |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | 公開URL（`https://` から、末尾スラッシュなし）。canonical・OGP・sitemap・JSON-LD に使う。未設定なら Vercel の本番 URL（`*.vercel.app`）になる。独自ドメインを入れると、本番の `*.vercel.app` へのアクセスは独自ドメインへ転送される |
| `RESEND_API_KEY` | Resend の API キー（本番で未設定だと、フォームは「お電話で」と案内するエラーを返す） |
| `MAIL_FROM` | 送信元（既定：`株式会社佐々木設備 <noreply@x-edge-mail.jp>`） |
| `MAIL_TO` | 通知先（`sasakisetsubi912@gmail.com`） |
| `NEXT_PUBLIC_GA_ID` | GA4 の測定 ID（`G-` で始まる）。本番（Production）だけで計測する。入れると、プライバシーポリシーに GA の記載が自動で出る |
| `GOOGLE_SITE_VERIFICATION` | Search Console の「HTML タグ」で確認するときのコード（`content="…"` の中身）。DNS で確認するなら不要 |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile（フォームのロボット判定）のキー。両方入れると有効になる（フォームに確認の枠が出る） |
| `VERCEL_DEEP_CLONE` | `true` にする。sitemap の lastmod（最終更新日）を git の履歴から取るため。未設定だと lastmod を出さない |

## ページ

| URL | 内容 |
|---|---|
| `/` | TOP |
| `/company` | 会社紹介（理念・代表挨拶・会社概要） |
| `/service` | 事業紹介（Works01〜04・強み・施工実績 `#results`） |
| `/recruit` | 採用情報（エントリーフォーム `#entry`） |
| `/contact` | お問い合わせフォーム（※指示書の4ページ以外に追加） |
| `/privacy` | プライバシーポリシー（※同上） |

API：`/api/entry`（採用エントリー）、`/api/contact`（お問い合わせ）。

## 更新のしかた

- **写真**：`public/images/` に、`lib/images.ts` の一覧と同じファイル名で置くだけで、仮画像から差し替わる（反映にはビルドが必要）。WebP/AVIF への変換は `next/image` が自動で行う。
  - 撮影データの元ファイル（`佐々木設備HP撮影/`、約540MB）は git に入れない。サイトに置くのは長辺2400px（全幅）／1600px（その他）に縮小し、位置情報などのメタデータを消したもの。
  - 公開済みの写真を差し替えるときは、**ファイル名も変える**（同じ名前だと、画像の最適化キャッシュで古い写真が出続けることがある）。
  - 縦長の枠で人物が切れるときは、`lib/images.ts` の `position`（object-position）で残す位置を指定する。
- **施工実績**：`data/results.ts` の配列に追加する。`pickup: true` のものが TOP に最大3件出る。
- **スタッフ紹介**：`data/staff.ts` で `published: true` にすると採用ページに表示される。
- **募集要項・福利厚生・応募の流れ**：`data/recruit.ts`
- **会社情報（住所・電話・資格など）**：`lib/site.ts`
- **アクセント色**：`app/globals.css` の `--color-accent`
- **ロゴ**：元データは `assets/logo-source.jpg`。サイトでは透過PNG `public/logo-mark.png`（濃い背景では CSS で白に反転）、ファビコンは `app/icon.png`・`app/apple-icon.png`

## アニメーション

指示書の A1〜A13 は `app/globals.css`（CSS transition）と、`components/` の小さなクライアントコンポーネント（`RevealObserver`・`Loader`・`HeroSlideshow`・`CountUp`・`StickyMenu`）で実装している。

- スクロールで画面に入った `.js-reveal` 要素に `is-active` が付き、CSS で動く。
- ローディングは初回訪問のみ（sessionStorage で判定。使えない場合は出さない）。
- `prefers-reduced-motion: reduce` のときと、JS が無効のときは、最初からすべて表示される。

## 未確定事項（コード内の `TODO(要確認)`）

- [ ] 設立日（`lib/site.ts`）
- [ ] 郵便番号（`lib/site.ts`。未確定のあいだは表示しない）
- [ ] 施工実績のエリア・追加分（`data/results.ts`）
- [ ] 未経験の日給・雇用形態・応募の流れ（`data/recruit.ts`）
- [ ] 給与が確定したら `JOB_POSTING_ENABLED = true`（JobPosting の構造化データを出力。`datePosted` も見直す）
- [x] スタッフ紹介の名前・入社年・コメント（`data/staff.ts`）
- [ ] アクセント色
- [x] ドメイン（`https://www.sasakisetsubi.com`。Xserver で取得、DNS は Xserver のまま Vercel に向けている）
- [ ] 「私たちの強み」の説明文・各見出しのキャッチ（指示書の文章から起こした案。要確認）
- [ ] 公開後に Google Search Console へ登録（下の「公開の手順」）

## 公開の手順（SEO・計測・セキュリティ）

### 1. ドメイン
1. ドメインを取得し、Vercel の Project → Settings → Domains に `example.co.jp` と `www.example.co.jp` を追加する。どちらか一方を正にして、もう一方は Vercel の画面で正のほうへ転送（308）する
2. DNS に Vercel が示すレコード（apex は A、www は CNAME）を設定する。SSL 証明書は Vercel が自動で発行する
3. 環境変数 `NEXT_PUBLIC_SITE_URL` を正のほう（例 `https://www.example.co.jp`）にして再デプロイする
4. `https://<正のドメイン>/robots.txt` の Sitemap 行と、ページの canonical が新しいドメインになっていることを確かめる

### 2. Google Search Console
1. 「ドメイン」プロパティで追加し、表示される TXT レコードを DNS に入れて確認する（http/https・www 有無をまとめて扱える。HTML タグで確認する場合は `GOOGLE_SITE_VERIFICATION`）
2. 「サイトマップ」に `sitemap.xml` を送信する
3. 「URL 検査」で TOP・採用情報をインデックス登録リクエストする
4. 1〜2 週間後に「ページのインデックス登録」で、6 ページが登録されているか確かめる

### 3. Google アナリティクス 4
1. GA4 のプロパティとウェブストリームを作り、測定 ID を `NEXT_PUBLIC_GA_ID` に入れて再デプロイする（プライバシーポリシーの「アクセス解析ツールについて」も自動で出る）
2. GA4 の管理 → イベントで `generate_lead`（問い合わせ・応募の完了）をキーイベントにする。`tel_click`（電話番号のタップ）もキーイベントにしてよい
3. GA4 の管理 → データ保持を 14 か月にする（既定は 2 か月）
4. 「リアルタイム」で自分のアクセスが見えることを確かめる

### 4. セキュリティ
- CSP は試験運用中（`next.config.ts` の `CSP_REPORT_ONLY = true`）。公開から 1〜2 週間、Vercel のログで `[csp-report]` を検索し、正規の動作（GA・地図・フォーム）による違反が出ていなければ `false` にして本番適用する
- Vercel の Firewall で `/api/contact`・`/api/entry` に IP ごとのレート制限（例：10 分に 5 回）を設定する（コード側の制限はサーバーごとのメモリなので、併用する）
- フォームのスパムが増えたら Turnstile のキーを入れる
- 公開後に確かめる：securityheaders.com（A 以上）、PageSpeed Insights（モバイル）、リッチリザルトテスト（TOP・事業紹介）、Search Console のインデックス状況
