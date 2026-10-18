export type BenefitIcon = "insurance" | "license" | "uniform" | "holiday";

export const benefits: { title: string; text: string; icon: BenefitIcon }[] = [
  { title: "社会保険完備", text: "各種社会保険に加入しています。", icon: "insurance" },
  { title: "資格取得支援制度", text: "仕事に必要な資格の取得を会社がサポートします。", icon: "license" },
  { title: "作業着支給", text: "現場で着る作業着は会社から支給します。", icon: "uniform" },
  { title: "日曜・祝日・年末年始休み", text: "休日をしっかり取り、家族との時間も大切にできます。", icon: "holiday" },
];

export type Requirement = { label: string; value: string };

export type Job = {
  id: string;
  title: string;
  requirements: Requirement[];
};

// 両職種で共通の項目
const common: Requirement[] = [
  // TODO(要確認): 雇用形態
  { label: "雇用形態", value: "正社員" },
  // TODO(要確認): 未経験の日給（12,000〜15,000円の意味か）
  { label: "給与（未経験）", value: "日給12,000円〜15,000円" },
  { label: "給与（経験者）", value: "日給15,000円〜25,000円" },
  { label: "勤務時間", value: "8:00〜17:00" },
  { label: "休日", value: "日曜・祝日、年末年始" },
  { label: "待遇", value: "社会保険完備、資格取得支援、作業着支給" },
  { label: "応募資格", value: "年齢・経験不問（18歳未満の方もご応募いただけます）" },
  { label: "勤務地", value: "関東一円の各現場" },
];

export const jobs: Job[] = [
  {
    id: "duct",
    title: "ダクト工事スタッフ",
    requirements: [{ label: "仕事内容", value: "空調・換気・排煙・厨房排気などのダクトの施工" }, ...common],
  },
  {
    id: "heavy",
    title: "重量鳶スタッフ",
    requirements: [{ label: "仕事内容", value: "空調機などの大型機器の搬入・据付" }, ...common],
  },
];

// TODO(要確認): 応募の受け方が確定したら見直す
export const flow = [
  { title: "応募", text: "フォームまたはお電話でご応募ください。" },
  { title: "お電話でご連絡", text: "担当者から面接の日程についてご連絡します。" },
  { title: "面接", text: "会社や仕事について、気になることは何でも聞いてください。" },
  { title: "内定", text: "入社日などをご相談のうえ決めていきます。" },
];

// JobPosting の構造化データは給与が確定してから true にする
export const JOB_POSTING_ENABLED = false;
