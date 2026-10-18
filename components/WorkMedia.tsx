import Photo from "@/components/Photo";
import type { Work } from "@/data/works";

/** 事業のイラスト（A8：色パネルが横へ抜ける） */
export default function WorkMedia({ work, sizes, className = "aspect-[4/3]" }: { work: Work; sizes: string; className?: string }) {
  return (
    <div className={`c-panel js-reveal c-card-image bg-white ${className}`}>
      <div className="c-panel__inner">
        <Photo name={work.image} sizes={sizes} />
      </div>
    </div>
  );
}
