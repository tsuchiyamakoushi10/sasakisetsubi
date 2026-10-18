"use client";

import { useEffect, useState } from "react";

export type StickyItem = { id: string; label: string };

/** A6 左固定メニュー（PCのみ）。表示中のセクションを強調する */
export default function StickyMenu({ items }: { items: StickyItem[] }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="ページ内メニュー" className="l-sticky-menu hidden lg:block">
      <ul className="space-y-3">
        {items.map((item) => {
          const active = current === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="group c-en relative flex h-5 w-10 items-center text-[13px]"
                aria-current={active ? "location" : undefined}
              >
                <span className={`block h-px transition-all duration-500 ${active ? "w-8 bg-white" : "w-3 bg-white/60 group-hover:w-6"}`} />
                {/* 本文に重ならないよう、ラベルはホバー・フォーカス時だけ出す */}
                <span className="pointer-events-none absolute left-11 whitespace-nowrap opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
