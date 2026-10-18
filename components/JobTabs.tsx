"use client";

import { useId, useRef, useState } from "react";
import type { Job } from "@/data/recruit";

/** 募集要項（職種ごとにタブで切り替え） */
export default function JobTabs({ jobs }: { jobs: Job[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + jobs.length) % jobs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="職種" className="grid grid-cols-2 border-b border-ink">
        {jobs.map((job, i) => (
          <button
            key={job.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${baseId}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`c-mincho py-4 text-[16px] font-semibold tracking-[0.08em] transition-colors duration-500 md:py-5 md:text-lg ${
              active === i ? "bg-ink text-white" : "bg-white text-ink hover:bg-mist"
            }`}
          >
            {job.title}
          </button>
        ))}
      </div>
      {jobs.map((job, i) => (
        <div
          key={job.id}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={active !== i}
        >
          <dl>
            {job.requirements.map((r) => (
              <div key={r.label} className="grid gap-1 border-b border-line py-5 md:grid-cols-[12rem_1fr] md:gap-8 md:py-6">
                <dt className="text-sm font-medium tracking-[0.1em] text-sub md:text-[15px] md:text-ink">{r.label}</dt>
                <dd className="leading-loose">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
