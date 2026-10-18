import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/recruit", priority: 0.9 },
    { path: "/company", priority: 0.8 },
    { path: "/service", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
    { path: "/privacy", priority: 0.2 },
  ];
  return pages.map((p) => ({ url: `${SITE_URL}${p.path}`, changeFrequency: "monthly", priority: p.priority }));
}
