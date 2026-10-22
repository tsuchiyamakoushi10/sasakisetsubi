"use client";

import { useState } from "react";

/** 施工実績カードの写真。サムネイルを押すと上の写真が切り替わる */
export default function ResultGallery({ slides, thumbs }: { slides: React.ReactNode[]; thumbs: React.ReactNode[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <>
      <div className="c-card-image relative aspect-[4/3] overflow-hidden bg-mist">
        {slides.map((slide, i) => (
          <div
            key={i}
            aria-hidden={i !== current}
            className={`absolute inset-0 transition-opacity duration-500 ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            {slide}
          </div>
        ))}
      </div>
      <ul className="mt-2 grid grid-cols-4 gap-2">
        {thumbs.map((thumb, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`${i + 1}枚目の写真を表示`}
              aria-pressed={i === current}
              className={`relative block aspect-[4/3] w-full overflow-hidden bg-mist transition-opacity duration-300 ${
                i === current ? "opacity-100 outline-2 -outline-offset-2 outline-ink" : "opacity-50 hover:opacity-100"
              }`}
            >
              {thumb}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
