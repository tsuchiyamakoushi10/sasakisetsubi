import Photo from "@/components/Photo";
import WorkIllust from "@/components/WorkIllust";
import type { Work } from "@/data/works";

/** 事業の写真（A8：色パネルが横へ抜ける）。写真がない項目はイラストを出す */
export default function WorkMedia({ work, sizes, className = "aspect-[4/3]" }: { work: Work; sizes: string; className?: string }) {
  return (
    <div className={`c-panel js-reveal c-card-image bg-white ${className}`}>
      <div className="c-panel__inner">
        {work.image ? (
          <Photo name={work.image} sizes={sizes} />
        ) : (
          <WorkIllust name={work.icon} label={`${work.title}のイラスト`} />
        )}
      </div>
    </div>
  );
}
