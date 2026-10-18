import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Shippori_Mincho, Sorts_Mill_Goudy } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import Loader from "@/components/Loader";
import RevealObserver from "@/components/RevealObserver";
import SpCta from "@/components/SpCta";
import { organizationJsonLd } from "@/lib/structured-data";
import { company, DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const noto = Noto_Sans_JP({
  variable: "--font-noto",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  weight: ["500", "600", "700"],
  display: "swap",
  preload: false,
});

const sorts = Sorts_Mill_Goudy({
  variable: "--font-sorts",
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s｜${company.name}` },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: company.name,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#222222",
  viewportFit: "cover",
};

// 描画前に実行：JS 有効の印（.js）と、初回訪問ならローディング（.is-loading）を付ける
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;if(!sessionStorage.getItem('ss-visited')){sessionStorage.setItem('ss-visited','1');d.classList.add('is-loading');}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${noto.variable} ${shippori.variable} ${sorts.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <Loader />
        <Header />
        <main>{children}</main>
        <Footer />
        <SpCta />
        <RevealObserver />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
