import "server-only";
import { experienceOptions, jobOptions, labelOf, type ContactData, type EntryData } from "@/lib/form";
import { company, fullAddress } from "@/lib/site";

const signature = `
──────────────────
${company.name}
${fullAddress}
TEL ${company.tel}（受付 ${company.hours}／${company.holidays}）
──────────────────`;

export function entryAdminMail(d: EntryData) {
  return {
    subject: `【採用エントリー】${d.name} 様（${labelOf(jobOptions, d.job)}）`,
    text: `ホームページから採用エントリーがありました。

■ お名前：${d.name}
■ 電話番号：${d.tel}
■ 年齢：${d.age}歳
■ 希望職種：${labelOf(jobOptions, d.job)}
■ 経験の有無：${labelOf(experienceOptions, d.experience)}
■ メールアドレス：${d.email || "（未入力）"}
■ メッセージ：
${d.message || "（なし）"}
`,
  };
}

export function entryReplyMail(d: EntryData) {
  return {
    subject: `【${company.name}】採用エントリーを受け付けました`,
    text: `${d.name} 様

このたびは${company.name}の求人にご応募いただき、ありがとうございます。
以下の内容でエントリーを受け付けました。
担当者より、ご入力いただいた電話番号へご連絡いたします。

■ お名前：${d.name}
■ 電話番号：${d.tel}
■ 年齢：${d.age}歳
■ 希望職種：${labelOf(jobOptions, d.job)}
■ 経験の有無：${labelOf(experienceOptions, d.experience)}
■ メッセージ：
${d.message || "（なし）"}

※ このメールは送信専用のアドレスから自動でお送りしています。
※ お心当たりのない場合は、お手数ですが上記の電話番号までご連絡ください。
${signature}`,
  };
}

export function contactAdminMail(d: ContactData) {
  return {
    subject: `【お問い合わせ】${d.company ? `${d.company} ` : ""}${d.name} 様`,
    text: `ホームページからお問い合わせがありました。

■ 会社名：${d.company || "（未入力）"}
■ お名前：${d.name}
■ 電話番号：${d.tel}
■ メールアドレス：${d.email}
■ お問い合わせ内容：
${d.message}
`,
  };
}

export function contactReplyMail(d: ContactData) {
  return {
    subject: `【${company.name}】お問い合わせを受け付けました`,
    text: `${d.company ? `${d.company}\n` : ""}${d.name} 様

このたびは${company.name}へお問い合わせいただき、ありがとうございます。
以下の内容で受け付けました。内容を確認のうえ、担当者よりご連絡いたします。

■ 会社名：${d.company || "（未入力）"}
■ お名前：${d.name}
■ 電話番号：${d.tel}
■ メールアドレス：${d.email}
■ お問い合わせ内容：
${d.message}

※ このメールは送信専用のアドレスから自動でお送りしています。
${signature}`,
  };
}
