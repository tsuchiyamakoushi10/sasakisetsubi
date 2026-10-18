import Link from "next/link";
import Button from "@/components/Button";
import CountUp from "@/components/CountUp";
import Cover from "@/components/Cover";
import Hero from "@/components/Hero";
import MapEmbed from "@/components/MapEmbed";
import Photo from "@/components/Photo";
import ResultList from "@/components/ResultList";
import SectionHeading from "@/components/SectionHeading";
import StickyMenu from "@/components/StickyMenu";
import WorkMedia from "@/components/WorkMedia";
import ContactSection from "@/components/ContactSection";
import { pickupResults } from "@/data/results";
import { works } from "@/data/works";
import { company, fullAddress, mapQuery } from "@/lib/site";

const sticky = [
  { id: "about", label: "About" },
  { id: "works", label: "Works" },
  { id: "results", label: "Results" },
  { id: "recruit", label: "Recruit" },
  { id: "access", label: "Access" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <StickyMenu items={sticky} />
      <Hero />

      {/* ABOUT */}
      <section id="about" className="l-section">
        <div className="l-container grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div>
            <SectionHeading en="About" ja="佐々木設備について" />
            <p className="js-reveal js-fade c-mincho mt-10 text-[22px] font-semibold leading-[1.7] tracking-[0.06em] md:mt-14 md:text-[28px]">
              安全と信頼を、何よりも。
            </p>
            <p className="js-reveal js-fade mt-6 leading-[2.1] md:mt-8">
              埼玉県八潮市を拠点に、ダクト工事と重量鳶を中心に、再開発プロジェクトなどの大規模な現場から小規模な店舗まで、関東一円で施工を行っています。父から受け継いだ信頼を守りながら、見えない部分こそ手を抜かない仕事で、次の世代へつなげていきます。
            </p>
            <div className="js-reveal js-fade mt-10">
              <Button href="/company">会社紹介へ</Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
            <Photo name="hands.jpg" sizes="(min-width: 768px) 50vw, 100vw" />
            <Cover />
          </div>
        </div>

        <div className="l-container mt-20 md:mt-32">
          <ul className="grid border-y border-line md:grid-cols-3">
            {[
              { label: "代表の現場経験", value: <CountUp to={25} />, unit: "年" },
              { label: "従業員", value: <CountUp to={10} />, unit: "名" },
              { label: "対応エリア", value: "関東一円", unit: "" },
            ].map((s, i) => (
              <li
                key={s.label}
                className="js-reveal js-fade flex items-baseline justify-between gap-4 border-line px-2 py-7 not-last:border-b md:flex-col md:items-center md:justify-center md:gap-3 md:py-12 md:not-last:border-r md:not-last:border-b-0"
                style={{ "--delay": `${i * 0.12}s` } as React.CSSProperties}
              >
                <span className="text-sm tracking-[0.1em] text-sub">{s.label}</span>
                <span className="c-mincho font-semibold">
                  <span className={`leading-none ${s.unit ? "text-[40px] md:text-[56px]" : "text-[30px] md:text-[40px]"}`}>{s.value}</span>
                  {s.unit && <span className="ml-1 text-lg md:text-xl">{s.unit}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="l-section bg-mist">
        <div className="l-container">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading en="Works" ja="事業紹介" />
            <p className="js-reveal js-fade max-w-xl text-[15px] leading-loose">
              ダクト工事から重量機器の搬入・据付、足場の組立、保温工事まで。一つの現場に必要な工事をまとめてお任せいただけます。
            </p>
          </div>
          <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
            {works.map((w, i) => (
              <li key={w.no} className="js-reveal js-fade" style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}>
                <Link href={`/service#work-${w.no}`} className="c-card group block">
                  <WorkMedia work={w} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                  <p className="c-en mt-6 text-[15px] text-sub">Works{w.no}</p>
                  <h3 className="c-mincho mt-2 text-[22px] font-semibold tracking-[0.06em] md:text-[24px]">{w.title}</h3>
                  <p className="mt-3 text-sm leading-loose">{w.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="js-reveal js-fade mt-14 md:mt-20">
            <Button href="/service">事業紹介へ</Button>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="l-section">
        <div className="l-container">
          <SectionHeading en="Results" ja="施工実績" />
          <div className="mt-14 md:mt-20">
            <ResultList results={pickupResults} />
          </div>
          <div className="js-reveal js-fade mt-14 md:mt-20">
            <Button href="/service#results">施工実績をもっと見る</Button>
          </div>
        </div>
      </section>

      {/* RECRUIT */}
      <section id="recruit" className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <Photo name="recruit-bg.jpg" sizes="100vw" tone="dark" />
          <div className="absolute inset-0 bg-black/50" />
          <Cover color="var(--color-ink)" />
        </div>
        <div className="l-container relative py-28 md:py-48">
          <SectionHeading en="Recruit" ja="採用情報" tone="light" />
          <p className="js-reveal js-fade c-mincho mt-10 text-[26px] font-semibold leading-[1.7] tracking-[0.08em] md:mt-14 md:text-[44px]">
            経験はいらない。
            <br />
            必要なのは、やる気だけ。
          </p>
          <p className="js-reveal js-fade mt-6 text-white/90 md:mt-8">未経験の方にも、基礎から丁寧にお教えします。</p>
          <div className="js-reveal js-fade mt-10 flex flex-col gap-4 sm:flex-row md:mt-14">
            <Button href="/recruit" variant="white">
              採用情報を見る
            </Button>
            <Button href="/recruit#entry" variant="accent">
              採用エントリー
            </Button>
          </div>
        </div>
      </section>

      {/* ACCESS */}
      <section id="access" className="l-section">
        <div className="l-container">
          <SectionHeading en="Access" ja="アクセス" />
          <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <MapEmbed className="js-reveal js-fade aspect-[4/3] md:aspect-auto md:min-h-[420px]" />
            <div className="js-reveal js-fade">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Photo name="access.jpg" sizes="(min-width: 768px) 40vw, 100vw" />
              </div>
              <dl className="mt-8 space-y-4 text-[15px] leading-relaxed">
                <div>
                  <dt className="text-sm text-sub">所在地</dt>
                  <dd className="mt-1">
                    {company.postalCode && <>〒{company.postalCode}<br /></>}
                    {fullAddress}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-sub">TEL</dt>
                  <dd className="mt-1">
                    <a href={company.telHref}>{company.tel}</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-sub">営業時間</dt>
                  <dd className="mt-1">
                    {company.hours}（{company.holidays}）
                  </dd>
                </div>
              </dl>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="c-link mt-6 inline-block text-sm"
              >
                Googleマップで開く
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
