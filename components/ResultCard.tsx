import Photo from "@/components/Photo";
import type { Result } from "@/data/results";

export default function ResultCard({ result }: { result: Result }) {
  return (
    <article className="c-card">
      <div className="c-card-image relative aspect-[4/3] overflow-hidden bg-mist">
        {result.image ? (
          <Photo name={result.image} sizes="(min-width: 768px) 33vw, 100vw" />
        ) : (
          <div className="c-placeholder">
            <span className="c-placeholder__text">写真準備中</span>
          </div>
        )}
      </div>
      <dl className="mt-5 grid grid-cols-[5.5em_1fr] gap-y-1 text-sm leading-relaxed">
        <dt className="text-sub">建物の用途</dt>
        <dd>{result.use}</dd>
        {result.area && (
          <>
            <dt className="text-sub">エリア</dt>
            <dd>{result.area}</dd>
          </>
        )}
        <dt className="text-sub">工事内容</dt>
        <dd className="c-mincho text-base font-semibold">{result.work}</dd>
      </dl>
    </article>
  );
}
