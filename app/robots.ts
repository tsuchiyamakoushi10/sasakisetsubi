import type { MetadataRoute } from "next";
import { IS_PRODUCTION, SITE_URL } from "@/lib/site";

// AI の学習用のクローラー（各社の公式ページで名前を確認：2026年11月）。
// 止めても、Google 検索・AI による概要（AI Overviews）・ChatGPT 検索などへの表示には影響しない。
// 検索・引用用（OAI-SearchBot・Claude-SearchBot・PerplexityBot など）は止めない（AI 検索で紹介されなくなるため）
const AI_TRAINING_CRAWLERS = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot"];

// 学習用を止めるか（要相談。止める場合は true）
const BLOCK_AI_TRAINING = false;

export default function robots(): MetadataRoute.Robots {
  // Preview（確認用 URL）はクロールさせない
  if (!IS_PRODUCTION) return { rules: [{ userAgent: "*", disallow: "/" }] };

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      ...(BLOCK_AI_TRAINING ? [{ userAgent: AI_TRAINING_CRAWLERS, disallow: "/" }] : []),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
