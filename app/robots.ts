import type { MetadataRoute } from "next";
import { IS_PRODUCTION, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview（確認用 URL）はクロールさせない
  if (!IS_PRODUCTION) return { rules: [{ userAgent: "*", disallow: "/" }] };

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
