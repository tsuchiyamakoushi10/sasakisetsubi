import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { company } from "@/lib/site";

/** お問い合わせ・採用エントリーへの導線 */
export default function ContactSection() {
  return (
    <section id="contact" className="l-section bg-mist">
      <div className="l-container">
        <SectionHeading en="Contact" ja="お問い合わせ・採用エントリー" align="center" />
        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:mt-20 md:grid-cols-2 md:gap-8">
          <Link href="/contact" className="js-reveal js-fade c-card group block bg-white p-8 transition-colors duration-500 hover:bg-ink hover:text-white md:p-12">
            <p className="c-en text-sm text-sub">Contact</p>
            <p className="c-mincho mt-3 text-xl font-semibold tracking-[0.06em] md:text-[24px]">工事のご相談・お問い合わせ</p>
            <p className="mt-4 text-sm leading-loose opacity-80">ダクト工事・重量機器搬入据付・足場・保温工事のご相談はこちら。</p>
            <span className="c-button__arrow mt-8 block text-current" aria-hidden="true" />
          </Link>
          <Link
            href="/recruit#entry"
            className="js-reveal js-fade c-card group block bg-accent p-8 text-white transition-colors duration-500 hover:bg-ink md:p-12"
            style={{ "--delay": "0.12s" } as React.CSSProperties}
          >
            <p className="c-en text-sm text-white/70">Entry</p>
            <p className="c-mincho mt-3 text-xl font-semibold tracking-[0.06em] md:text-[24px]">採用エントリー</p>
            <p className="mt-4 text-sm leading-loose opacity-90">未経験歓迎。まずは話を聞くだけでもOKです。</p>
            <span className="c-button__arrow mt-8 block" aria-hidden="true" />
          </Link>
        </div>

        <div className="js-reveal js-fade mt-14 text-center md:mt-20">
          <p className="text-sm tracking-[0.1em] text-sub">お電話でのお問い合わせ・ご応募</p>
          <a href={company.telHref} className="c-en mt-3 inline-block text-[40px] not-italic leading-none tracking-[0.06em] md:text-[56px]">
            {company.tel}
          </a>
          <p className="mt-4 text-sm">
            受付時間 {company.hours}（{company.holidays}）
          </p>
        </div>
      </div>
    </section>
  );
}
