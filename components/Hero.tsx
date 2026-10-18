import HeroSlideshow from "@/components/HeroSlideshow";
import LogoMark from "@/components/LogoMark";
import Photo from "@/components/Photo";
import type { ImageName } from "@/lib/images";

const slides: ImageName[] = ["hero-01.jpg", "hero-prep.jpg", "hero-cutting.jpg"];

/** TOP メインビジュアル（A2〜A5） */
export default function Hero() {
  return (
    <section className="l-mv" aria-label="メインビジュアル">
      <HeroSlideshow
        slides={slides.map((name, i) => (
          // 1 枚目は LCP なので先読みする
          <Photo key={name} name={name} sizes="100vw" preload={i === 0} tone="dark" />
        ))}
      />
      <div className="l-mv-shade" />
      <div className="l-mv-filter" />

      <div className="l-mv-logo absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
        <LogoMark size={96} white className="mb-8 h-16 w-16 md:mb-10 md:h-24 md:w-24" />
        <h1 className="c-mincho text-[28px] font-semibold leading-[1.6] tracking-[0.12em] md:text-[48px]">
          受け継いだ信頼を、
          <br className="md:hidden" />
          次の現場へ。
        </h1>
        <p className="c-en mt-5 text-base text-white/85 md:mt-8 md:text-xl">Build trust, pass it on.</p>
        <p className="mt-8 text-xs tracking-[0.2em] text-white/75 md:text-sm">埼玉県八潮市　ダクト工事・重量鳶</p>
      </div>

      <a href="#about" className="l-mv-scroll c-en" aria-label="下へスクロール">
        SCROLL
        <span className="l-mv-scroll-line" />
      </a>
    </section>
  );
}
