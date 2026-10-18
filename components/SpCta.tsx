import Link from "next/link";
import { company } from "@/lib/site";

/** SP固定CTA（画面下部） */
export default function SpCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[140] grid grid-cols-2 bg-ink text-white md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <a href={company.telHref} className="flex h-16 items-center justify-center gap-2 border-r border-white/20 text-[15px] tracking-[0.1em]">
        <PhoneIcon />
        電話する
      </a>
      <Link href="/recruit#entry" className="flex h-16 items-center justify-center gap-2 bg-accent text-[15px] tracking-[0.1em]">
        採用エントリー
      </Link>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 3.5h3.5l1.8 4.5-2.3 1.5a11 11 0 0 0 6.5 6.5l1.5-2.3 4.5 1.8V19a1.5 1.5 0 0 1-1.5 1.5C10.6 20.5 3.5 13.4 3.5 5A1.5 1.5 0 0 1 5 3.5Z" />
    </svg>
  );
}
