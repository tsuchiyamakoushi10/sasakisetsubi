import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { company, fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "株式会社佐々木設備の個人情報の取り扱いについて。",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

const sections = [
  {
    title: "個人情報の取得",
    body: "当社は、お問い合わせフォーム・採用エントリーフォーム・お電話などを通じて、お名前、電話番号、メールアドレス、年齢などの個人情報を、適正な手段により取得します。",
  },
  {
    title: "利用目的",
    body: "取得した個人情報は、お問い合わせへの回答、工事に関するご連絡、採用選考とそれに関するご連絡のために利用し、それ以外の目的では利用しません。",
  },
  {
    title: "第三者への提供",
    body: "法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。",
  },
  {
    title: "安全管理",
    body: "当社は、個人情報の漏えい、紛失、改ざんなどを防ぐため、必要かつ適切な安全管理措置を講じます。",
  },
  {
    title: "開示・訂正・削除",
    body: "ご本人から個人情報の開示、訂正、利用停止、削除などのご請求があった場合は、ご本人であることを確認のうえ、速やかに対応します。",
  },
  {
    title: "改定",
    body: "本ポリシーの内容は、必要に応じて予告なく改定することがあります。改定後の内容は、本ページに掲載した時点から効力を生じます。",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero en="Privacy Policy" ja="プライバシーポリシー" />
      <section className="l-section">
        <div className="l-container">
          <div className="mx-auto max-w-3xl">
            <p className="leading-loose">
              {company.name}（以下「当社」）は、お客様および求職者の皆様の個人情報を適切に取り扱うため、以下のとおりプライバシーポリシーを定めます。
            </p>
            <ol className="mt-12 space-y-10">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <h2 className="c-mincho text-xl font-semibold tracking-[0.06em]">
                    {i + 1}. {s.title}
                  </h2>
                  <p className="mt-3 leading-loose">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-14 border-t border-line pt-8 text-[15px] leading-loose">
              <h2 className="c-mincho text-xl font-semibold tracking-[0.06em]">お問い合わせ窓口</h2>
              <p className="mt-3">
                {company.name}
                <br />
                {fullAddress}
                <br />
                TEL {company.tel}（受付 {company.hours}／{company.holidays}）
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
