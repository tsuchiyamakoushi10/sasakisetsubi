// サイト全体で使う会社情報。未確定の値は TODO(要確認) を付けている。

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const company = {
  name: "株式会社佐々木設備",
  nameEn: "Sasaki Setsubi Co., Ltd.",
  representative: "代表取締役　佐々木 龍一",
  representativeName: "佐々木 龍一",
  // TODO(要確認): 設立日か事業承継日か
  established: "2016年10月7日",
  // TODO(要確認): 郵便番号が確定したら入れる（未確定のあいだは表示しない）
  postalCode: null as string | null,
  region: "埼玉県",
  locality: "八潮市",
  street: "大字大原593番地3",
  tel: "048-948-7513",
  telHref: "tel:048-948-7513",
  hours: "8:00〜17:00",
  holidays: "日曜・祝日休み",
  employees: "10名",
  area: "関東一円",
  areaNote: "その他エリアもご相談ください",
  services: ["各種ダクト工事一式", "重量機器搬入・据付工事一式", "足場組立一式", "保温工事一式"],
  clients: [
    "協和エンジニアリング株式会社",
    "松島設備工業株式会社",
    "有限会社築紫設備工業",
    "有限会社伊藤ダクト",
    "昭栄重設有限会社",
  ],
  // 代表の保有資格（佐々木龍一_免許一覧_最終版.pdf より）
  licenses: [
    { category: "技能講習", name: "足場の組立て等作業主任者" },
    { category: "技能講習", name: "高所作業車運転員（作業床10m以上）" },
    { category: "技能講習", name: "玉掛け（つり上げ荷重1t以上のクレーン等）" },
    { category: "特別教育", name: "クレーン運転員（5t未満）" },
    { category: "特別教育", name: "建設用リフト18m以上0.25t以上" },
    { category: "特別教育", name: "フルハーネス型墜落制止用器具特別教育" },
    { category: "安全衛生教育", name: "職長等・安全衛生責任者教育" },
    { category: "安全衛生教育", name: "職長等・安全衛生責任者教育（能力向上教育）" },
  ] as { category: string; name: string }[],
} as const;

export const fullAddress = `${company.region}${company.locality}${company.street}`;
export const mapQuery = encodeURIComponent(`${company.name} ${fullAddress}`);

export const DEFAULT_TITLE = "株式会社佐々木設備｜ダクト工事・重量鳶〔埼玉県八潮市〕";
export const DEFAULT_DESCRIPTION =
  "埼玉県八潮市の株式会社佐々木設備は、ダクト工事・重量機器搬入据付・足場組立・保温工事を行う施工会社です。関東一円で対応。未経験歓迎でスタッフを募集しています。";

export const mainNav = [
  { href: "/company", en: "Company", ja: "会社紹介" },
  { href: "/service", en: "Service", ja: "事業紹介" },
  { href: "/recruit", en: "Recruit", ja: "採用情報" },
  { href: "/contact", en: "Contact", ja: "お問い合わせ" },
] as const;
