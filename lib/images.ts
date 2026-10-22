// 写真のファイル名と内容の一覧。
// /public/images/ に同じ名前のファイルを置けば、仮画像から自動で差し替わる。
// position：縦長の枠やスマホで切り抜かれるときに残す位置（CSS の object-position。省略時は中央）
type ImageMeta = { label: string; alt: string; position?: string };

export const images = {
  "hero-01.jpg": { label: "TOPメイン（ダクトを取り付ける職人）", alt: "厨房のダクトを取り付ける職人", position: "78% 50%" },
  "hero-prep.jpg": { label: "作業場でダクトを切断する職人", alt: "作業場でダクトを切断する職人", position: "55% 50%" },
  "hero-cutting.jpg": { label: "ダクト切断の手元", alt: "切断機でダクトを切る手元", position: "65% 50%" },
  "company-hero.jpg": { label: "店舗での作業風景（引き）", alt: "店舗でダクト工事を行うスタッフ", position: "30% 50%" },
  "service-hero.jpg": { label: "天井のダクト施工", alt: "店舗の天井にダクトを施工する様子" },
  "recruit-main.jpg": { label: "採用メイン（現場で天井を確認する3人）", alt: "天井を見上げて施工箇所を確認するスタッフ", position: "55% 50%" },
  "top-recruit.jpg": { label: "TOPの採用（3人での打ち合わせ）", alt: "図面を見ながら打ち合わせをするスタッフ", position: "25% 50%" },
  "about.jpg": { label: "佐々木設備について", alt: "ダクトを加工する職人", position: "20% 50%" },
  "works-01.jpg": { label: "ダクト工事のイラスト", alt: "天井にダクトを施工する職人のイラスト" },
  "works-02.jpg": { label: "重量機器搬入・据付のイラスト", alt: "クレーンで吊った空調機を据え付ける職人のイラスト" },
  "works-03.jpg": { label: "足場組立のイラスト", alt: "足場を組み立てる職人のイラスト" },
  "works-04.jpg": { label: "保温工事のイラスト", alt: "保温材を巻いたダクトを施工する職人のイラスト" },
  "tools.jpg": { label: "道具とダクト", alt: "現場で使う切断機とダクト", position: "40% 50%" },
  "philosophy.jpg": { label: "理念", alt: "スタッフ2人でダクトを組み立てる様子" },
  "recruit-message.jpg": { label: "2人での作業", alt: "スタッフ2人でダクトを運ぶ様子" },
  "president.jpg": { label: "代表のプロフィール写真", alt: "代表取締役 佐々木 龍一" },
  "staff-01.jpg": { label: "スタッフのプロフィール写真", alt: "スタッフの写真" },
  "staff-02.jpg": { label: "スタッフのプロフィール写真", alt: "スタッフの写真" },
  "result-01.jpg": { label: "完成したダクト（焼肉店）", alt: "焼肉店の厨房排気ダクト" },
  "result-supermarket-01.jpg": { label: "大型スーパーの機械置場のダクト", alt: "大型スーパーの機械置場に施工した換気ダクト", position: "50% 60%" },
  "result-supermarket-02.jpg": { label: "大型スーパーのダクト（全景）", alt: "床置きの架台に並ぶ大型スーパーの換気ダクト", position: "50% 70%" },
  "result-supermarket-03.jpg": { label: "大型スーパーのダクトと送風機", alt: "送風機につながる大型スーパーの換気ダクト", position: "50% 70%" },
  "result-supermarket-04.jpg": { label: "大型スーパーのダクトと室外機", alt: "室外機の横を通る大型スーパーの換気ダクト", position: "50% 65%" },
  "result-factory-01.jpg": { label: "工場の天井を曲がる大型ダクト", alt: "工場の天井で曲がりながら延びる大型の角ダクト", position: "50% 55%" },
  "result-factory-02.jpg": { label: "工場の天井に並ぶ大型ダクト", alt: "工場の天井に並んで吊られた大型の角ダクト", position: "50% 45%" },
  "result-factory-03.jpg": { label: "工場の鉄骨梁の下の大型ダクト", alt: "工場の鉄骨梁の下を通る大型の角ダクト", position: "50% 62%" },
  "result-factory-04.jpg": { label: "工場の天井へ立ち上がる大型ダクト", alt: "工場の天井へ向かって立ち上がる大型の角ダクト", position: "50% 50%" },
  "result-yakiniku-02.jpg": { label: "焼肉店の屋上の排気ファンとダクト", alt: "焼肉店の屋上に据え付けた排気ファンとダクト", position: "50% 40%" },
  "result-kindergarten-01.jpg": { label: "幼稚園の厨房でフィルターを取り付ける職人", alt: "幼稚園の厨房で排気フードのフィルターを取り付ける職人", position: "50% 45%" },
  "result-datacenter-01.jpg": { label: "データセンターの屋外排気ダクト", alt: "データセンターの外壁に取り付けた排気ダクト", position: "50% 40%" },
  "result-building-01.jpg": { label: "大型ビルの立てダクト", alt: "大型ビルの機械室に立ち上がる角ダクト", position: "50% 45%" },
  "result-insulation-01.jpg": { label: "保温材を巻いたダクト", alt: "天井に施工した保温材巻きのダクト", position: "50% 40%" },
  "result-scaffold-01.jpg": { label: "足場と屋上の排気筒（見上げ）", alt: "足場の横に立つ屋上の排気筒", position: "50% 30%" },
  "result-scaffold-02.jpg": { label: "足場と屋上の排気筒（全景）", alt: "排気筒の施工のために組んだ足場", position: "50% 35%" },
  "result-scaffold-03.jpg": { label: "足場の上の排気筒の頂部", alt: "足場に囲まれた排気筒の頂部", position: "50% 35%" },
} as const satisfies Record<string, ImageMeta>;

export type ImageName = keyof typeof images;
