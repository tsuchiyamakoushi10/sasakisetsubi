import Photo from "@/components/Photo";
import type { ImageName } from "@/lib/images";

type Props = {
  en: string;
  ja: string;
  image?: ImageName;
  lead?: React.ReactNode;
};

/** 下層ページの見出し（写真の上に英字ラベル＋日本語見出し） */
export default function PageHero({ en, ja, image, lead }: Props) {
  return (
    <section className="relative flex min-h-[440px] items-end overflow-hidden bg-ink text-white md:min-h-[560px]">
      {image && (
        <div className="absolute inset-0">
          <Photo name={image} sizes="100vw" preload tone="dark" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <div className="l-container relative pb-14 pt-32 md:pb-24">
        <p className="c-en text-base text-white/80 md:text-lg">{en}</p>
        <h1 className="c-mincho mt-3 text-[30px] font-semibold leading-[1.5] tracking-[0.1em] md:mt-4 md:text-[46px]">{ja}</h1>
        {lead && <div className="mt-6 max-w-2xl text-[15px] leading-loose text-white/90 md:text-base">{lead}</div>}
      </div>
    </section>
  );
}
