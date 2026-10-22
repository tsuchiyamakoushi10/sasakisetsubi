import type { ImageName } from "@/lib/images";

// 施工実績。建物名・元請け名・店名は載せない。
// 追加するときは配列の先頭に足す（新しい順）。写真は /public/images/ に置いて images に名前を入れる。
export type Result = {
  id: string;
  /** 建物の用途（未確定なら null。カードに表示しない） */
  use: string | null;
  /** エリア（未確定なら null。カードに表示しない） */
  area: string | null;
  /** 工事内容 */
  work: string;
  /** 1 枚目がカードの表紙。2 枚以上あるとサムネイルで切り替えられる */
  images?: ImageName[];
  /** TOP にピックアップする（最大 3 件） */
  pickup?: boolean;
};

export const results: Result[] = [
  {
    id: "supermarket-01",
    use: "店舗（大型スーパー）",
    area: "神奈川県",
    work: "空調・換気ダクト工事",
    images: ["result-supermarket-01.jpg", "result-supermarket-02.jpg", "result-supermarket-03.jpg", "result-supermarket-04.jpg"],
    pickup: true,
  },
  {
    id: "factory-01",
    use: "工場",
    area: "福島県",
    work: "大型ダクト工事",
    images: ["result-factory-01.jpg", "result-factory-02.jpg", "result-factory-03.jpg", "result-factory-04.jpg"],
    pickup: true,
  },
  {
    id: "datacenter-01",
    use: "データセンター",
    area: "新潟県",
    work: "排気ダクト工事",
    images: ["result-datacenter-01.jpg"],
    pickup: true,
  },
  {
    id: "building-01",
    use: "大型ビル",
    area: "東京都",
    work: "ダクト工事",
    images: ["result-building-01.jpg"],
  },
  {
    id: "kindergarten-01",
    use: "幼稚園（厨房）",
    area: null, // エリアは載せない
    work: "厨房排気工事",
    images: ["result-kindergarten-01.jpg"],
  },
  {
    id: "yakiniku-02",
    use: "店舗（焼肉店）",
    area: "東京都豊島区",
    work: "排気ファン・ダクト工事",
    images: ["result-yakiniku-02.jpg"],
  },
  {
    id: "scaffold-01",
    use: null,
    area: null, // エリアは載せない
    work: "足場組立・排気筒工事",
    images: ["result-scaffold-02.jpg", "result-scaffold-01.jpg", "result-scaffold-03.jpg"],
  },
  {
    id: "insulation-01",
    use: null,
    area: null, // エリアは載せない
    work: "保温工事",
    images: ["result-insulation-01.jpg"],
  },
  {
    id: "yakiniku-01",
    use: "店舗（焼肉店）",
    area: "埼玉県八潮市",
    work: "厨房排気ダクト工事",
    images: ["result-01.jpg"],
  },
];

export const pickupResults = results.filter((r) => r.pickup).slice(0, 3);
