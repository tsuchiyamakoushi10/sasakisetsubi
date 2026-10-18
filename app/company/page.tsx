import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import Cover from "@/components/Cover";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import StickyMenu from "@/components/StickyMenu";
import { company, fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "会社紹介",
  description:
    "株式会社佐々木設備の理念・代表挨拶・会社概要。埼玉県八潮市を拠点に、ダクト工事・重量鳶を中心として関東一円で施工しています。",
  alternates: { canonical: "/company" },
  openGraph: { url: "/company" },
};

const sticky = [
  { id: "philosophy", label: "Philosophy" },
  { id: "message", label: "Message" },
  { id: "overview", label: "Company" },
];

export default function CompanyPage() {
  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "会社名", value: company.name },
    { label: "代表者", value: company.representative },
    { label: "設立", value: company.established },
    {
      label: "所在地",
      value: (
        <>
          {company.postalCode && <>〒{company.postalCode} </>}
          {fullAddress}
        </>
      ),
    },
    { label: "TEL", value: <a href={company.telHref}>{company.tel}</a> },
    { label: "営業時間", value: `${company.hours}（${company.holidays}）` },
    { label: "従業員数", value: company.employees },
    {
      label: "事業内容",
      value: (
        <ul>
          {company.services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      ),
    },
    { label: "対応エリア", value: `${company.area}（${company.areaNote}）` },
    {
      label: "主要取引先",
      value: (
        <>
          <ul>
            {company.clients.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="mt-1 text-sm text-sub">（順不同）</p>
        </>
      ),
    },
    ...(company.licenses.length > 0
      ? [
          {
            label: "保有資格（代表）",
            value: (
              <ul>
                {company.licenses.map((l) => (
                  <li key={l.name} className="flex gap-3">
                    <span className="w-[6.5em] flex-none text-sm leading-loose text-sub">{l.category}</span>
                    <span>{l.name}</span>
                  </li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <StickyMenu items={sticky} />
      <PageHero en="Company" ja="会社紹介" image="company-hero.jpg" />

      {/* PHILOSOPHY */}
      <section id="philosophy" className="l-section">
        <div className="l-container grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div>
            <SectionHeading en="Philosophy" ja="理念" />
            <p className="js-reveal js-fade c-mincho mt-10 text-[30px] font-semibold tracking-[0.12em] md:mt-14 md:text-[44px]">安全と信頼。</p>
            <p className="js-reveal js-fade mt-6 leading-[2.1] md:mt-8">
              私が何よりも大切にしていることは、安全と信頼です。仲間を大切にし、全員が無事に一日を終え、笑顔で家族のもとへ帰る。そしてお客様から「佐々木設備に頼んでよかった」と思っていただける仕事をする。それが私たちの誇りです。
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Photo name="philosophy.jpg" sizes="(min-width: 768px) 50vw, 100vw" />
            <Cover />
          </div>
        </div>
      </section>

      {/* MESSAGE */}
      <section id="message" className="l-section bg-mist">
        <div className="l-container">
          <SectionHeading en="Message" ja="代表挨拶" />
          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-[2fr_3fr] md:gap-16 lg:gap-24">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Photo name="president.jpg" sizes="(min-width: 768px) 40vw, 100vw" />
              <Cover color="var(--color-mist)" />
            </div>
            <div className="js-reveal js-fade md:pt-8">
              <p className="c-mincho text-[22px] font-semibold leading-[1.7] tracking-[0.06em] md:text-[28px]">
                父から受け継いだものを、
                <br />
                次の世代へ。
              </p>
              <p className="mt-8 leading-[2.1]">
                ダクト工事や重量鳶・鳶の仕事に25年携わり、公共事業や大型物件、店舗、工場など、さまざまな現場を経験してきました。父が築いてきた会社を受け継ぎ、これまで大切にしてきたものを守りながら、自分の代でさらに成長させていきたいという思いで会社を継ぎました。父から受け継いだものを次の世代へつなぎ、仲間と共に長く信頼される会社をつくっていきたいと考えています。
              </p>
              <p className="mt-10 text-right">
                <span className="text-sm text-sub">代表取締役</span>
                <span className="c-mincho ml-4 text-[22px] font-semibold tracking-[0.15em]">{company.representativeName}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPANY */}
      <section id="overview" className="l-section">
        <div className="l-container">
          <SectionHeading en="Company" ja="会社概要" />
          <dl className="js-reveal js-fade mt-14 border-t border-line md:mt-20">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-1 border-b border-line py-5 md:grid-cols-[14rem_1fr] md:gap-8 md:py-7">
                <dt className="text-sm font-medium tracking-[0.1em] text-sub md:text-[15px] md:text-ink">{row.label}</dt>
                <dd className="leading-loose">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
