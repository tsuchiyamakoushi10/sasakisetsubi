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
| `NEXT_PUBLIC_SITE_URL` | 公開URL（末尾スラッシュなし）。canonical・OGP・sitemap・JSON-LD に使う |
| `RESEND_API_KEY` | Resend の API キー（本番で未設定だと、フォームは「お電話で」と案内するエラーを返す） |
| `MAIL_FROM` | 送信元（既定：`株式会社佐々木設備 <noreply@x-edge-mail.jp>`） |
| `MAIL_TO` | 通知先（`sasakisetsubi912@gmail.com`） |

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
- [ ] スタッフ紹介の名前・入社年・コメント（`data/staff.ts`。いまはデモ文で公開中）
- [ ] アクセント色
- [ ] ドメイン（`NEXT_PUBLIC_SITE_URL`）
- [ ] 「私たちの強み」の説明文・各見出しのキャッチ（指示書の文章から起こした案。要確認）
- [ ] 公開後に Google Search Console へ登録
