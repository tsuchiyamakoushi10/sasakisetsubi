import type { Metadata } from "next";
import { company, DEFAULT_TITLE } from "@/lib/site";

// openGraph は下の階層で指定すると親の値が丸ごと上書きされるので、共通の値をここで毎回入れる
export const baseOpenGraph = {
  type: "website",
  locale: "ja_JP",
  siteName: company.name,
} as const;

// 下層ページで openGraph を指定すると、app/opengraph-image.tsx の画像が引き継がれないので明示する
const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: DEFAULT_TITLE };

/** 下層ページの metadata（title・description・canonical・OGP をまとめて作る） */
export function pageMetadata({
  title,
  description,
  path,
  image = ogImage,
}: {
  title: string;
  description: string;
  path: string;
  /** そのページ専用の OGP 画像（app/<ページ>/opengraph-image.tsx がある場合） */
  image?: typeof ogImage;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, title: `${title}｜${company.name}`, description, url: path, images: [image] },
  };
}
