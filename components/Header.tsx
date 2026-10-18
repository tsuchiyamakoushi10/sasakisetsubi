"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LogoMark from "@/components/LogoMark";
import { company, mainNav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ページが変わったらメニューを閉じる
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("is-nav-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.classList.remove("is-nav-open");
    };
  }, [open]);

  const solid = scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[160] transition-[background-color,color,box-shadow] duration-500 ${
          solid ? "bg-white/95 text-ink shadow-[0_1px_0_rgb(0_0_0/0.06)] backdrop-blur" : "bg-transparent text-white"
        }`}
      >
        <div className="flex h-16 items-center justify-between pl-5 pr-2 md:h-[88px] md:pl-10 md:pr-6 lg:pl-20">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <LogoMark size={40} white={!solid} preload className="h-8 w-8 md:h-10 md:w-10" />
            <span className="c-mincho text-[17px] font-semibold tracking-[0.12em] md:text-xl">{company.name}</span>
          </Link>

          <div className="flex items-center gap-2 lg:gap-8">
            <nav aria-label="メインメニュー" className="hidden lg:block">
              <ul className="flex items-center gap-8 text-[14px] tracking-[0.1em]">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="relative py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100"
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.ja}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              href="/recruit#entry"
              className="hidden h-12 items-center bg-accent px-6 text-[14px] tracking-[0.1em] text-white transition-colors duration-500 hover:bg-ink md:inline-flex"
            >
              採用エントリー
            </Link>
            <button
              ref={burgerRef}
              type="button"
              className="flex h-14 w-14 items-center justify-center"
              aria-expanded={open}
              aria-controls="global-nav"
              aria-label={open ? "メニューを閉じる" : "メニューを開く"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="c-burger relative block h-[14px] w-8 [--h:14px]">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <GlobalNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/** A12 全画面メニュー */
function GlobalNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = [{ href: "/", en: "Top", ja: "トップ" }, ...mainNav];

  return (
    <div id="global-nav" className={`l-nav ${open ? "is-open" : ""}`} inert={!open} aria-hidden={!open}>
      <div className="l-container flex min-h-full flex-col justify-center gap-14 pb-16 pt-28 md:flex-row md:items-center md:justify-between md:gap-10">
        <nav aria-label="全画面メニュー">
          <ul className="space-y-5 md:space-y-7">
            {items.map((item, i) => (
              <li key={item.href} className="l-nav-item" style={{ "--i": i } as React.CSSProperties}>
                <Link href={item.href} onClick={onClose} className="group flex items-baseline gap-5">
                  <span className="c-en w-24 text-sm text-sub md:w-28">{item.en}</span>
                  <span className="c-mincho text-2xl tracking-[0.12em] transition-opacity group-hover:opacity-60 md:text-3xl">
                    {item.ja}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="l-nav-item space-y-6 md:max-w-sm" style={{ "--i": items.length } as React.CSSProperties}>
          <Link href="/recruit#entry" onClick={onClose} className="c-button c-button--accent w-full">
            採用エントリー
            <span className="c-button__arrow" />
          </Link>
          <div className="text-sm leading-relaxed text-white/80">
            <p>お電話でのお問い合わせ</p>
            <a href={company.telHref} className="c-en mt-1 block text-3xl not-italic text-white">
              {company.tel}
            </a>
            <p className="mt-1">
              受付 {company.hours}（{company.holidays}）
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
