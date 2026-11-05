import type { ImageName } from "@/lib/images";

// スタッフ紹介。公開するときは published: true にする。
export type Staff = {
  id: string;
  name: string;
  role: string;
  joined: string;
  image?: ImageName;
  message: string;
  published: boolean;
};

export const staff: Staff[] = [
  {
    id: "staff-01",
    name: "中島 亮",
    role: "重量鳶兼ダクト工事スタッフ",
    joined: "2003年入社",
    image: "staff-01.jpg",
    message:
      "重量鳶工事やダクト工事を中心に、店舗・工場・公共施設など、さまざまな現場で施工を担当しています。重量機器の搬入・据え付けからダクト施工まで、安全管理と品質にこだわり、一つひとつの作業を丁寧に行うことを心がけています。チームでの連携を大切にし、後輩指導にも取り組みながら、より良い施工を目指しています。",
    published: true,
  },
  {
    id: "staff-02",
    name: "佐藤 匠",
    role: "ダクト工事スタッフ",
    joined: "2014年入社",
    image: "staff-02.jpg",
    message:
      "社長や先輩から学んできた基本を大切にしながら、ダクト施工に取り組んでいます。安全と品質、報連相を徹底し、現場で気づいた改善点は積極的に共有し、後輩とも協力しながら着実に良い施工を積み重ねています。",
    published: true,
  },
];

export const publishedStaff = staff.filter((s) => s.published);
