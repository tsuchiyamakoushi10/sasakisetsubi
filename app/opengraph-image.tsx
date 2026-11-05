import { ogSize, renderOgImage } from "@/lib/og";
import { DEFAULT_TITLE } from "@/lib/site";

export const alt = DEFAULT_TITLE;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    photo: "hero-01.jpg",
    position: "78% 50%",
    lead: "ダクト工事・重量鳶",
    sub: "埼玉県八潮市・関東一円で施工",
  });
}
