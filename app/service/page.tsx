import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import Icon, { type IconName } from "@/components/Icon";
import PageHero from "@/components/PageHero";
import ResultList from "@/components/ResultList";
import SectionHeading from "@/components/SectionHeading";
import StickyMenu from "@/components/StickyMenu";
import WorkMedia from "@/components/WorkMedia";
import { results } from "@/data/results";
import { works } from "@/data/works";

export const metadata: Metadata = {
  title: "事業紹介・施工実績",
  description:
    "ダクト工事、重量機器搬入・据付、足場組立、保温工事。一つの現場に必要な工事をまとめてお任せいただけます。株式会社佐々木設備の事業内容と施工実績。",
  alternates: { canonical: "/service" },
  openGraph: { url: "/service" },
};

const sticky = [
  ...works.map((w) => ({ id: `work-${w.no}`, label: `Works${w.no}` })),
  { id: "strength", label: "Strength" },
  { id: "results", label: "Results" },
];

const strengths: { title: string; text: string; icon: IconName }[] = [
  {
    title: "見えない部分こそ、手を抜かない",
    text: "天井裏や壁の中など、完成後には見えなくなる部分こそ丁寧に。長く安心して使える施工を心がけています。",
    icon: "eye",
  },
  {
    title: "ダクトから重量・足場まで、まとめて対応",
    text: "ダクト工事・重量機器の搬入据付・足場組立・保温工事を自社で対応。窓口が一つで済み、工程の調整もスムーズです。",
    icon: "layers",
  },
  {
    title: "ご要望にスムーズかつ柔軟に対応",
    text: "大規模な現場から小規模な店舗まで、現場の状況やご要望に合わせて柔軟に対応します。",
    icon: "flex",
  },
];

export default function ServicePage() {
  return (
    <>
      <StickyMenu items={sticky} />
      <PageHero
        en="Service"
        ja="事業紹介"
        image="service-hero.jpg"
        lead="ダクト工事から重量機器の搬入・据付、足場の組立、保温工事まで。一つの現場に必要な工事をまとめてお任せいただけます。"
      />

      {/* WORKS 01〜04（左右交互） */}
      <section className="l-section">
        <div className="l-container space-y-24 md:space-y-40">
          {works.map((w, i) => (
            <article
              key={w.no}
              id={`work-${w.no}`}
              className="grid scroll-mt-28 items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24"
            >
              <WorkMedia
                work={w}
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`aspect-[4/3] ${i % 2 === 1 ? "md:order-2" : ""}`}
              />
              <div className="js-reveal js-fade">
                <p className="c-en flex items-baseline gap-3 text-sub">
                  <span className="text-[15px]">Works</span>
                  <span className="text-[44px] leading-none text-ink md:text-[64px]">{w.no}</span>
                </p>
                <h2 className="c-mincho mt-5 text-[26px] font-semibold tracking-[0.08em] md:text-[34px]">{w.title}</h2>
                <p className="c-en mt-2 text-sm text-sub">{w.en}</p>
                <p className="mt-6 leading-[2.1] md:mt-8">{w.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* STRENGTH */}
      <section id="strength" className="l-section bg-mist">
        <div className="l-container">
          <SectionHeading en="Strength" ja="私たちの強み" />
          <ol className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-8">
            {strengths.map((s, i) => (
              <li
                key={s.title}
                className="js-reveal js-fade bg-white p-8 md:p-10"
                style={{ "--delay": `${i * 0.12}s` } as React.CSSProperties}
              >
                <div className="flex items-start justify-between">
                  <span className="c-en text-[40px] leading-none text-line">{String(i + 1).padStart(2, "0")}</span>
                  <Icon name={s.icon} className="h-12 w-12 text-ink" />
                </div>
                <h3 className="c-mincho mt-8 text-xl font-semibold leading-[1.6] tracking-[0.06em] md:text-[22px]">{s.title}</h3>
                <p className="mt-4 text-sm leading-loose">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="l-section scroll-mt-16">
        <div className="l-container">
          <SectionHeading en="Results" ja="施工実績" />
          <p className="js-reveal js-fade mt-8 text-[15px] text-sub">
            ※ お客様の情報保護のため、建物名・店名などは掲載しておりません。
          </p>
          <div className="mt-14 md:mt-20">
            <ResultList results={results} />
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
