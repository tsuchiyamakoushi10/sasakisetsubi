"use client";

import { useEffect, useRef } from "react";

// Cloudflare Turnstile（ロボット判定）。NEXT_PUBLIC_TURNSTILE_SITE_KEY が未設定なら何も出さない。
// 判定が済むと、フォームに cf-turnstile-response という隠し項目が自動で入り、送信内容に含まれる
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, opts: { sitekey: string; language?: string }) => string;
  reset: (id?: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loading: Promise<void> | null = null;
function loadScript(): Promise<void> {
  loading ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loading = null;
      reject(new Error("turnstile load failed"));
    };
    document.head.appendChild(s);
  });
  return loading;
}

/** 送信に失敗したときは判定をやり直す（判定の結果は 1 回しか使えないため） */
export function resetTurnstile() {
  window.turnstile?.reset();
}

export default function Turnstile() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!SITE_KEY) return;
    let id: string | undefined;
    let cancelled = false;
    loadScript()
      .then(() => {
        if (!cancelled && ref.current && window.turnstile) id = window.turnstile.render(ref.current, { sitekey: SITE_KEY, language: "ja" });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (id) window.turnstile?.remove(id);
    };
  }, []);

  if (!SITE_KEY) return null;
  return <div ref={ref} className="flex justify-center" />;
}
