import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";
const isPreview = process.env.VERCEL_ENV === "preview";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
// 独自ドメインが設定されているか（未設定・vercel.app のままなら、vercel.app からの転送はしない）
const hasCustomDomain = /^https:\/\//.test(siteUrl) && !/\.vercel\.app\/?$/.test(siteUrl);

// Content Security Policy：読み込んでよい外部サイトを限定する。
// ページを静的に配信したいので nonce は使わず、インラインのスクリプトは許可している（Next.js 公式の「Without Nonces」の構成）。
// 外部サービスを足したら（埋め込み・計測タグなど）ここにドメインを追加する
const GA = ["https://*.googletagmanager.com", "https://*.google-analytics.com", "https://*.analytics.google.com"];
const TURNSTILE = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? ["https://challenges.cloudflare.com"] : [];
const directives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", "https://*.googletagmanager.com", ...TURNSTILE, ...(isDev ? ["'unsafe-eval'"] : [])],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "blob:", ...GA],
  "font-src": ["'self'"],
  "connect-src": ["'self'", ...GA],
  // Google マップの埋め込み（TOP のアクセス）
  "frame-src": ["https://www.google.com", "https://maps.google.com", ...TURNSTILE],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
};
// Preview では Vercel のツールバー（確認用のコメント機能）を使えるようにする
if (isPreview) {
  directives["script-src"].push("https://vercel.live");
  directives["style-src"].push("https://vercel.live");
  directives["img-src"].push("https://vercel.live", "https://vercel.com");
  directives["font-src"].push("https://vercel.live", "https://assets.vercel.com");
  directives["connect-src"].push("https://vercel.live", "wss://ws-us3.pusher.com");
  directives["frame-src"].push("https://vercel.live");
}
const toPolicy = (d: Record<string, string[]>) => Object.entries(d).map(([k, v]) => `${k} ${v.join(" ")}`).join("; ");

// 試験運用中は CSP_REPORT_ONLY = true：全体のポリシーは「違反を報告するだけ」にして、
// 壊れる心配のない項目（他サイトへの埋め込み禁止・プラグイン禁止など）だけを先に効かせる。
// /api/csp-report に届く報告（Vercel のログ）で問題がないのを確かめてから false にする
const CSP_REPORT_ONLY = true;
const enforcedBaseline = toPolicy({
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "frame-ancestors": ["'none'"],
});
const fullPolicy = toPolicy(directives);
// http の読み込みを https に切り替える（Report-Only では効かないので、常に有効にする側に入れる）
const upgrade = isDev ? "" : "; upgrade-insecure-requests";
const reporting = "; report-uri /api/csp-report; report-to csp";

const securityHeaders = [
  ...(CSP_REPORT_ONLY
    ? [
        { key: "Content-Security-Policy", value: enforcedBaseline + upgrade },
        { key: "Content-Security-Policy-Report-Only", value: fullPolicy + reporting },
      ]
    : [{ key: "Content-Security-Policy", value: fullPolicy + upgrade + reporting }]),
  { key: "Reporting-Endpoints", value: 'csp="/api/csp-report"' },
  // https のみで接続させる（2年。Vercel の既定と同じ値。includeSubDomains・preload は元に戻しにくいので付けていない）
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // 古いブラウザ向け（新しいブラウザは CSP の frame-ancestors を使う）
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    // 最適化した画像を 31 日キャッシュする（写真を差し替えるときはファイル名も変える運用なので、古い写真が残る心配はない）
    minimumCacheTTL: 2678400,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async redirects() {
    // 本番の vercel.app の URL に来たアクセスは独自ドメインへ転送する（検索エンジンに同じページが2つ登録されないように）
    if (process.env.VERCEL_ENV !== "production" || !hasCustomDomain) return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.+)\\.vercel\\.app" }],
        destination: `${siteUrl.replace(/\/$/, "")}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
