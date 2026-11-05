import { ogSize, renderOgImage } from "@/lib/og";
import { company } from "@/lib/site";

export const alt = `採用情報（未経験歓迎）｜${company.name}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    photo: "recruit-main.jpg",
    position: "55% 50%",
    lead: "未経験歓迎・スタッフ募集中",
    sub: "ダクト工事・重量鳶・年齢不問",
  });
}
