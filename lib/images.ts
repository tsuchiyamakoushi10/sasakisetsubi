// 写真のファイル名と内容の一覧。
// /public/images/ に同じ名前のファイルを置けば、仮画像から自動で差し替わる。
// position：縦長の枠やスマホで切り抜かれるときに残す位置（CSS の object-position。省略時は中央）
type ImageMeta = { label: string; alt: string; position?: string };

export const images = {
  "hero-01.jpg": { label: "TOPメイン（ダクトを取り付ける職人）", alt: "厨房のダクトを取り付ける職人", position: "62% 50%" },
  "hero-02.jpg": { label: "2人でダクトを持ち上げる", alt: "スタッフ2人でダクトを天井へ取り付ける様子" },
  "hero-03.jpg": { label: "ダクトをビス留めする", alt: "インパクトドライバーでダクトを固定する職人" },
  "company-hero.jpg": { label: "店舗での作業風景（引き）", alt: "店舗でダクト工事を行うスタッフ" },
  "service-hero.jpg": { label: "天井のダクト施工", alt: "店舗の天井にダクトを施工する様子" },
  "recruit-hero.jpg": { label: "採用メイン（3人での打ち合わせ）", alt: "図面を見ながら打ち合わせをするスタッフ" },
  "recruit-bg.jpg": { label: "現場で天井を確認する3人", alt: "天井を見上げて施工箇所を確認するスタッフ" },
  "work-close.jpg": { label: "ダクトの取り付け", alt: "天井際でダクトを取り付ける職人" },
  "hands.jpg": { label: "手元の寄り", alt: "ダクトを加工する職人の手元", position: "55% 50%" },
  "tools.jpg": { label: "道具とダクト", alt: "現場で使う切断機とダクト" },
  "meeting.jpg": { label: "打ち合わせ", alt: "現場での打ち合わせ" },
  "teamwork.jpg": { label: "2人での組立作業", alt: "スタッフ2人でダクトを組み立てる様子" },
  "president.jpg": { label: "代表のプロフィール写真", alt: "代表取締役 佐々木 龍一" },
  "staff-01.jpg": { label: "スタッフのプロフィール写真", alt: "スタッフの写真" },
  "staff-02.jpg": { label: "スタッフのプロフィール写真", alt: "スタッフの写真" },
  "result-01.jpg": { label: "完成したダクト（焼肉店）", alt: "焼肉店の厨房排気ダクト" },
  "access.jpg": { label: "作業場での準備", alt: "資材を加工して現場へ向かう準備をするスタッフ" },
} as const satisfies Record<string, ImageMeta>;

export type ImageName = keyof typeof images;
