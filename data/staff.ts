import type { ImageName } from "@/lib/images";

// スタッフ紹介。公開するときは published: true にする。
// TODO(要確認): 名前・入社年・コメントはデモ。本人のコメントが届いたら差し替える
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
    name: "〇〇 〇〇",
    role: "ダクト工事スタッフ",
    joined: "20XX年入社",
    image: "staff-01.jpg",
    message:
      "（デモ）前職は別の業界でしたが、ものづくりに関わりたくて入社しました。最初は道具の名前も分かりませんでしたが、先輩が一つずつ教えてくれます。自分が付けたダクトが現場で動いているのを見ると、やってよかったと感じます。",
    published: true,
  },
  {
    id: "staff-02",
    name: "〇〇 〇〇",
    role: "ダクト工事スタッフ",
    joined: "20XX年入社",
    image: "staff-02.jpg",
    message:
      "（デモ）現場ではチームで動くので、声をかけ合うことを大切にしています。できることが増えるたびに任される仕事も増えて、毎日成長を実感できる職場です。安全第一で、みんなで無事に帰ることを心がけています。",
    published: true,
  },
];

export const publishedStaff = staff.filter((s) => s.published);
