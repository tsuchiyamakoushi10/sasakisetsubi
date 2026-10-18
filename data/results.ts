import type { ImageName } from "@/lib/images";

// 施工実績。建物名・元請け名・店名は載せない。
// 追加するときは配列の先頭に足す（新しい順）。写真は /public/images/ に置いて image に名前を入れる。
export type Result = {
  id: string;
  /** 建物の用途 */
  use: string;
  /** エリア（未確定なら null。カードに表示しない） */
  area: string | null;
  /** 工事内容 */
  work: string;
  image?: ImageName;
  /** TOP にピックアップする（最大 3 件） */
  pickup?: boolean;
};

export const results: Result[] = [
  {
    id: "yakiniku-01",
    use: "店舗（焼肉店）",
    area: null, // TODO(要確認): エリア
    work: "厨房排気ダクト工事",
    image: "result-01.jpg",
    pickup: true,
  },
];

export const pickupResults = results.filter((r) => r.pickup).slice(0, 3);
