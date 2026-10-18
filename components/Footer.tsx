import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import { company, fullAddress, mainNav } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="l-container py-16 md:py-24">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div>
            <p className="flex items-center gap-4">
              <LogoMark size={48} white className="h-11 w-11 md:h-12 md:w-12" />
              <span className="c-mincho text-xl font-semibold tracking-[0.12em] md:text-2xl">{company.name}</span>
            </p>
            <address className="mt-6 text-sm not-italic leading-loose text-white/75">
              {company.postalCode && <>〒{company.postalCode} </>}
              {fullAddress}
              <br />
              TEL{" "}
              <a href={company.telHref} className="underline-offset-4 hover:underline">
                {company.tel}
              </a>
              <br />
              営業時間 {company.hours}（{company.holidays}）
            </address>
          </div>

          <nav aria-label="フッターメニュー">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4 whitespace-nowrap text-sm tracking-[0.08em] md:gap-x-12">
              <li>
                <Link href="/" className="hover:opacity-60">
                  トップ
                </Link>
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:opacity-60">
                    {item.ja}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/recruit#entry" className="hover:opacity-60">
                  採用エントリー
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:opacity-60">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="c-en mt-16 border-t border-white/15 pt-8 text-xs text-white/50">
          &copy; {company.nameEn} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
