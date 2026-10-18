"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 6000;

/** A2 メインビジュアルのスライドショー。表示中の写真はゆっくりズームする（CSS 側で 8s linear） */
export default function HeroSlideshow({ slides }: { slides: React.ReactNode[] }) {
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    // 初期表示を一度描画してからズームを開始する
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setZoom(true)));
    if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => cancelAnimationFrame(raf);
    }
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setCurrent((c) => (c + 1) % slides.length);
    }, INTERVAL_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, [slides.length]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {slides.map((slide, i) => (
        <div key={i} className={`l-mv-slide ${i === current ? "is-current" : ""} ${i === current && zoom ? "is-zoom" : ""}`}>
          <div className="l-mv-image">{slide}</div>
        </div>
      ))}
    </div>
  );
}
