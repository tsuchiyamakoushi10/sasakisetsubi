import type { ImageName } from "@/lib/images";

export type WorkIcon = "duct" | "heavy" | "scaffold" | "insulation";

export type Work = {
  no: string;
  title: string;
  en: string;
  summary: string;
  /** 写真がない項目はイラストで見せる（icon でイラストを選ぶ） */
  image?: ImageName;
  icon: WorkIcon;
};

export const works: Work[] = [
  {
    no: "01",
    title: "ダクト工事",
    en: "Duct work",
    summary: "空調・換気・排煙・厨房排気など、建物の空気の流れをつくるダクトを施工します。",
    icon: "duct",
  },
  {
    no: "02",
    title: "重量機器搬入・据付",
    en: "Heavy equipment",
    summary: "空調機などの大型機器を、安全に搬入して正確に据え付けます。",
    icon: "heavy",
  },
  {
    no: "03",
    title: "足場組立",
    en: "Scaffolding",
    summary: "安全な作業の土台となる足場を組み立てます。",
    icon: "scaffold",
  },
  {
    no: "04",
    title: "保温工事",
    en: "Insulation",
    summary: "ダクトや配管の保温で、結露を防ぎ省エネに貢献します。",
    icon: "insulation",
  },
];
