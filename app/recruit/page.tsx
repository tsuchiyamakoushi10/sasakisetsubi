import type { Metadata } from "next";
import Cover from "@/components/Cover";
import EntryForm from "@/components/form/EntryForm";
import Icon from "@/components/Icon";
import JobTabs from "@/components/JobTabs";
import JsonLd from "@/components/JsonLd";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import StickyMenu from "@/components/StickyMenu";
import { benefits, flow, JOB_POSTING_ENABLED, jobs } from "@/data/recruit";
import { publishedStaff } from "@/data/staff";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "採用情報（未経験歓迎）",
  description:
    "株式会社佐々木設備の採用情報。ダクト工事スタッフ・重量鳶スタッフを募集中。年齢・経験不問、未経験の方にも基礎から丁寧にお教えします。社会保険完備・資格取得支援・日曜祝日休み。",
  alternates: { canonical: "/recruit" },
  openGraph: { url: "/recruit" },
};

export default function RecruitPage() {
  const sticky = [
    { id: "message", label: "Message" },
    { id: "benefits", label: "Benefits" },
    ...(publishedStaff.length > 0 ? [{ id: "staff", label: "Staff" }] : []),
    { id: "requirements", label: "Requirements" },
    { id: "flow", label: "Flow" },
    { id: "entry", label: "Entry" },
  ];

  return (
    <>
      <StickyMenu items={sticky} />

      {/* ヒーロー */}
      {/* スマホは写真の下に見出し（顔に文字が重ならないように）、PC は写真の上に重ねる */}
      <section className="relative overflow-hidden bg-ink text-white md:flex md:min-h-[720px] md:items-end">
        <div className="relative h-[56svh] min-h-[320px] md:absolute md:inset-0 md:h-auto">
          <Photo name="recruit-main.jpg" sizes="100vw" preload tone="dark" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/40 md:from-black/70 md:via-black/30 md:to-black/30" />
        </div>
        <div className="l-container relative -mt-6 pb-16 md:mt-0 md:pb-28 md:pt-32">
          <p className="c-en text-base text-white/80 md:text-lg">Recruit</p>
          <h1 className="c-mincho mt-4 text-[32px] font-semibold leading-[1.6] tracking-[0.1em] md:text-[56px]">
            経験はいらない。
            <br />
            必要なのは、やる気だけ。
          </h1>
          <p className="mt-6 text-white/90 md:text-lg">ダクト工事スタッフ・重量鳶スタッフ募集／未経験歓迎</p>
          <a href="#entry" className="c-button c-button--accent mt-10">
            <span>採用エントリー</span>
            <span className="c-button__arrow" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* MESSAGE */}
      <section id="message" className="l-section">
        <div className="l-container grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div className="relative aspect-[4/3] overflow-hidden md:order-2">
            <Photo name="recruit-message.jpg" sizes="(min-width: 768px) 50vw, 100vw" />
            <Cover />
          </div>
          <div>
            <SectionHeading en="Message" ja="採用理念" />
            <p className="js-reveal js-fade c-mincho mt-10 text-[22px] font-semibold leading-[1.7] tracking-[0.06em] md:mt-14 md:text-[28px]">
              全員が無事に、
              <br />
              笑顔で家族のもとへ。
            </p>
            <p className="js-reveal js-fade mt-6 leading-[2.1] md:mt-8">
              年齢や経験を問わず、やる気のある方を歓迎しています。未経験でも基礎から丁寧にお教えしますので、ご安心ください。仲間を大切にし、全員が無事に一日を終えて、笑顔で家族のもとへ帰る。そんな職場を一緒につくりましょう。
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="l-section bg-mist">
        <div className="l-container">
          <SectionHeading en="Benefits" ja="福利厚生" />
          <ul className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:gap-6 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <li
                key={b.title}
                className="js-reveal js-fade flex flex-col items-center bg-white px-4 py-8 text-center md:px-8 md:py-12"
                style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
              >
                <Icon name={b.icon} className="h-12 w-12 md:h-14 md:w-14" />
                <h3 className="c-mincho mt-5 text-[16px] font-semibold leading-[1.6] tracking-[0.04em] md:mt-6 md:text-xl">{b.title}</h3>
                <p className="mt-3 hidden text-sm leading-loose md:block">{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STAFF（published: true のデータがあるときだけ表示） */}
      {publishedStaff.length > 0 && (
        <section id="staff" className="l-section">
          <div className="l-container">
            <SectionHeading en="Staff" ja="スタッフ紹介" />
            <ul className="mt-14 grid gap-14 md:mt-20 md:grid-cols-2 md:gap-12">
              {publishedStaff.map((s) => (
                <li key={s.id} className="js-reveal js-fade grid grid-cols-[7.5rem_1fr] gap-6 md:grid-cols-[12rem_1fr] md:gap-8">
                  <div className="relative aspect-[3/4] overflow-hidden bg-mist">{s.image && <Photo name={s.image} sizes="12rem" />}</div>
                  <div>
                    <p className="text-sm text-sub">
                      {s.role}／{s.joined}
                    </p>
                    <p className="c-mincho mt-2 text-xl font-semibold tracking-[0.1em]">{s.name}</p>
                    <p className="mt-4 text-sm leading-loose">{s.message}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* REQUIREMENTS */}
      <section id="requirements" className={`l-section ${publishedStaff.length > 0 ? "bg-mist" : ""}`}>
        <div className="l-container">
          <SectionHeading en="Requirements" ja="募集要項" />
          <div className="js-reveal js-fade mt-14 md:mt-20">
            <JobTabs jobs={jobs} />
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section id="flow" className={`l-section ${publishedStaff.length > 0 ? "" : "bg-mist"}`}>
        <div className="l-container">
          <SectionHeading en="Flow" ja="応募から入社まで" />
          <ol className="mt-14 grid gap-3 md:mt-20 md:grid-cols-4 md:gap-0">
            {flow.map((f, i) => (
              <li
                key={f.title}
                className="js-reveal js-fade relative flex gap-5 bg-white p-6 md:flex-col md:gap-0 md:p-8 md:not-last:mr-6 md:not-last:after:absolute md:not-last:after:top-1/2 md:not-last:after:-right-[18px] md:not-last:after:h-3 md:not-last:after:w-3 md:not-last:after:-translate-y-1/2 md:not-last:after:rotate-45 md:not-last:after:border-r md:not-last:after:border-t md:not-last:after:border-ink"
                style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
              >
                <span className="c-en text-[32px] leading-none text-line md:text-[40px]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="c-mincho text-lg font-semibold tracking-[0.06em] md:mt-5 md:text-xl">{f.title}</h3>
                  <p className="mt-2 text-sm leading-loose">{f.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ENTRY */}
      <section id="entry" className="l-section scroll-mt-16 bg-ink text-white">
        <div className="l-container">
          <div className="mx-auto max-w-3xl">
            <SectionHeading en="Entry" ja="採用エントリー" tone="light" align="center" />
            <p className="js-reveal js-fade mt-8 text-center leading-loose text-white/85">
              入力は1分ほどで終わります。
              <br className="md:hidden" />
              ご応募後、担当者からお電話でご連絡します。
            </p>

            <div className="js-reveal js-fade mt-10 border border-white/20 px-6 py-6 text-center md:mt-12">
              <p className="text-sm text-white/80">お電話でも応募できます</p>
              <a href={company.telHref} className="c-en mt-2 inline-block text-[34px] not-italic leading-tight tracking-[0.06em] md:text-[44px]">
                {company.tel}
              </a>
              <p className="mt-1 text-xs text-white/70 md:text-sm">
                受付 {company.hours}（{company.holidays}）
              </p>
            </div>

            <div className="mt-10 text-ink md:mt-12">
              <EntryForm />
            </div>
          </div>
        </div>
      </section>

      {JOB_POSTING_ENABLED && <JsonLd data={jobPostingJsonLd()} />}
    </>
  );
}

// 給与が確定し JOB_POSTING_ENABLED を true にしたら出力される
function jobPostingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": jobs.map((job) => ({
      "@type": "JobPosting",
      title: job.title,
      description: `<p>${job.requirements.map((r) => `${r.label}：${r.value}`).join("<br>")}</p>`,
      datePosted: "2026-10-01", // TODO: 公開日に合わせる
      employmentType: "FULL_TIME",
      hiringOrganization: { "@type": "Organization", name: company.name },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressCountry: "JP",
          addressRegion: company.region,
          addressLocality: company.locality,
          streetAddress: company.street,
          ...(company.postalCode ? { postalCode: company.postalCode } : {}),
        },
      },
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "JPY",
        value: { "@type": "QuantitativeValue", minValue: 12000, maxValue: 25000, unitText: "DAY" },
      },
    })),
  };
}
