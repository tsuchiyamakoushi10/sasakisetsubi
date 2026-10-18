"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * .js-reveal が付いた要素が画面に入ったら is-active を付ける。
 * 動きはすべて CSS の transition 側で定義している。
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".js-reveal:not(.is-active)");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-active"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
