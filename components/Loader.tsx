"use client";

import { useEffect, useRef } from "react";
import LogoMark from "@/components/LogoMark";

const MIN_SHOW_MS = 500;
const MAX_WAIT_MS = 2500;
const LEAVE_MS = 800;

/**
 * A1 ローディング（初回訪問のみ）。
 * 表示するかどうかは <head> のインラインスクリプトが html に is-loading を付けて決める。
 * ローディング後（または初回以外は読み込み直後）に html へ is-ready を付け、A3/A4/A6 を動かす。
 */
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const timers: number[] = [];

    const ready = () => {
      // 初期状態を一度描画してから切り替え、transition を確実に走らせる
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("is-ready")));
    };

    if (!root.classList.contains("is-loading")) {
      ready();
      return;
    }

    const start = performance.now();
    let done = false;
    const leave = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN_SHOW_MS - (performance.now() - start));
      timers.push(
        window.setTimeout(() => {
          ref.current?.classList.add("is-leave");
          ready();
          timers.push(window.setTimeout(() => root.classList.remove("is-loading"), LEAVE_MS));
        }, wait),
      );
    };

    if (document.readyState === "complete") leave();
    else window.addEventListener("load", leave, { once: true });
    timers.push(window.setTimeout(leave, MAX_WAIT_MS));

    return () => {
      window.removeEventListener("load", leave);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div ref={ref} className="l-loader" aria-hidden="true">
      <div className="flex flex-col items-center gap-5">
        <LogoMark size={64} white className="h-14 w-14 md:h-16 md:w-16" />
        <p className="c-mincho text-lg tracking-[0.2em] md:text-xl">株式会社佐々木設備</p>
      </div>
    </div>
  );
}
