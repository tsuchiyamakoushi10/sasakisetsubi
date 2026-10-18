// フォームの項目定義と検証（クライアント・サーバー共通）

export const HONEYPOT_FIELD = "website";

export const jobOptions = [
  { value: "duct", label: "ダクト工事スタッフ" },
  { value: "heavy", label: "重量鳶スタッフ" },
  { value: "any", label: "どちらでも" },
] as const;

export const experienceOptions = [
  { value: "none", label: "未経験" },
  { value: "some", label: "経験あり" },
] as const;

export type FieldErrors = Record<string, string>;

const TEL_RE = /^[0-9０-９+＋\-－ー()（）\s]{10,20}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export type EntryData = {
  name: string;
  tel: string;
  age: string;
  job: string;
  experience: string;
  email: string;
  message: string;
};

export function validateEntry(input: Record<string, unknown>): { data: EntryData; errors: FieldErrors } {
  const data: EntryData = {
    name: str(input.name, 50),
    tel: str(input.tel, 20),
    age: str(input.age, 3),
    job: str(input.job, 10),
    experience: str(input.experience, 10),
    email: str(input.email, 254),
    message: str(input.message, 2000),
  };
  const errors: FieldErrors = {};
  if (!data.name) errors.name = "お名前を入力してください";
  if (!data.tel) errors.tel = "電話番号を入力してください";
  else if (!TEL_RE.test(data.tel)) errors.tel = "電話番号を正しく入力してください";
  const age = Number(data.age);
  if (!data.age) errors.age = "年齢を入力してください";
  else if (!Number.isInteger(age) || age < 15 || age > 99) errors.age = "年齢を正しく入力してください";
  if (data.job && !jobOptions.some((o) => o.value === data.job)) errors.job = "希望職種を選んでください";
  if (data.experience && !experienceOptions.some((o) => o.value === data.experience)) errors.experience = "経験の有無を選んでください";
  if (data.email && !EMAIL_RE.test(data.email)) errors.email = "メールアドレスを正しく入力してください";
  if (input.agree !== true && input.agree !== "on") errors.agree = "プライバシーポリシーへの同意が必要です";
  return { data, errors };
}

export type ContactData = {
  company: string;
  name: string;
  tel: string;
  email: string;
  message: string;
};

export function validateContact(input: Record<string, unknown>): { data: ContactData; errors: FieldErrors } {
  const data: ContactData = {
    company: str(input.company, 100),
    name: str(input.name, 50),
    tel: str(input.tel, 20),
    email: str(input.email, 254),
    message: str(input.message, 4000),
  };
  const errors: FieldErrors = {};
  if (!data.name) errors.name = "お名前を入力してください";
  if (!data.tel) errors.tel = "電話番号を入力してください";
  else if (!TEL_RE.test(data.tel)) errors.tel = "電話番号を正しく入力してください";
  if (!data.email) errors.email = "メールアドレスを入力してください";
  else if (!EMAIL_RE.test(data.email)) errors.email = "メールアドレスを正しく入力してください";
  if (!data.message) errors.message = "お問い合わせ内容を入力してください";
  if (input.agree !== true && input.agree !== "on") errors.agree = "プライバシーポリシーへの同意が必要です";
  return { data, errors };
}

export const labelOf = (options: readonly { value: string; label: string }[], value: string) =>
  options.find((o) => o.value === value)?.label ?? "未選択";
