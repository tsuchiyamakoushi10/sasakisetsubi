import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// 各ページの中身を作っているファイル。lastmod（最終更新日）は、これらの最後のコミット日にする。
// Google は lastmod が正確なときだけ使う（priority・changefreq は使われないので出さない）
const pages: { path: string; sources: string[] }[] = [
  { path: "", sources: ["app/page.tsx", "components/Hero.tsx", "data/works.ts", "data/results.ts", "lib/site.ts"] },
  { path: "/company", sources: ["app/company/page.tsx", "lib/site.ts"] },
  { path: "/service", sources: ["app/service/page.tsx", "data/works.ts", "data/results.ts"] },
  { path: "/recruit", sources: ["app/recruit/page.tsx", "data/recruit.ts", "data/staff.ts"] },
  { path: "/contact", sources: ["app/contact/page.tsx", "components/form/ContactForm.tsx"] },
  { path: "/privacy", sources: ["app/privacy/page.tsx"] },
];

/**
 * git の履歴から最終更新日を取る（取れない環境では lastmod を出さない。不正確な日付を出すよりよい）。
 * Vercel は履歴を途中までしか取得しない（shallow clone）ので、環境変数 VERCEL_DEEP_CLONE=true を設定して全履歴を取らせる
 */
function lastCommitDate(files: string[]): Date | undefined {
  try {
    // 履歴が途中までだと、古いファイルの日付が取得の起点の日になってしまうので使わない
    if (execFileSync("git", ["rev-parse", "--is-shallow-repository"], { encoding: "utf8" }).trim() === "true") return undefined;
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files], { encoding: "utf8" }).trim();
    return out ? new Date(out) : undefined;
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({ url: `${SITE_URL}${p.path}`, lastModified: lastCommitDate(p.sources) }));
}
