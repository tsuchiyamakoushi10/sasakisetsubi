import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/form/ContactForm";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "株式会社佐々木設備への工事のご相談・お問い合わせ。ダクト工事・重量機器搬入据付・足場組立・保温工事は関東一円で対応します。",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero en="Contact" ja="お問い合わせ" image="tools.jpg" />

      <section className="l-section bg-mist">
        <div className="l-container">
          <div className="mx-auto max-w-3xl">
            <SectionHeading en="Phone" ja="お電話でのお問い合わせ" align="center" />
            <div className="js-reveal js-fade mt-10 text-center">
              <a href={company.telHref} className="c-en inline-block text-[40px] not-italic leading-none tracking-[0.06em] md:text-[56px]">
                {company.tel}
              </a>
              <p className="mt-4 text-sm">
                受付時間 {company.hours}（{company.holidays}）
              </p>
            </div>

            <SectionHeading en="Form" ja="フォームでのお問い合わせ" align="center" className="mt-24 md:mt-32" />
            <p className="js-reveal js-fade mt-8 text-center text-[15px] leading-loose">
              工事のご相談・お見積りなど、お気軽にお問い合わせください。
              <br />
              採用へのご応募は
              <Link href="/recruit#entry" className="c-link">
                採用エントリー
              </Link>
              からお願いします。
            </p>
            <div className="mt-10 md:mt-12">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
