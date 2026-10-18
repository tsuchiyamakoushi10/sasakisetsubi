import ResultCard from "@/components/ResultCard";
import type { Result } from "@/data/results";

/** 件数が少なくても崩れないよう、1〜2 件のときは幅を抑えて並べる */
export default function ResultList({ results }: { results: Result[] }) {
  if (results.length === 0) {
    return <p className="text-sub">施工実績は準備中です。</p>;
  }
  const cols = results.length === 1 ? "md:grid-cols-2 lg:grid-cols-3" : results.length === 2 ? "md:grid-cols-2 lg:max-w-[66%]" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <ul className={`grid gap-x-10 gap-y-14 ${cols}`}>
      {results.map((r, i) => (
        <li key={r.id} className="js-reveal js-fade" style={{ "--delay": `${i * 0.12}s` } as React.CSSProperties}>
          <ResultCard result={r} />
        </li>
      ))}
    </ul>
  );
}
