import { works } from "@/data/works";
import { company, DEFAULT_DESCRIPTION, SITE_URL } from "@/lib/site";

// 構造化データ（JSON-LD）。検索結果の表示と、AI が会社の情報を正しく読み取るために使う
const ORG_ID = `${SITE_URL}/#organization`;
const AREA_SERVED = ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"].map((name) => ({
  "@type": "AdministrativeArea",
  name,
}));

/** 全ページ共通：会社（GeneralContractor）とサイト（WebSite） */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GeneralContractor",
        "@id": ORG_ID,
        name: company.name,
        alternateName: company.nameEn,
        description: DEFAULT_DESCRIPTION,
        url: SITE_URL,
        logo: `${SITE_URL}/logo-mark.png`,
        image: `${SITE_URL}/images/hero-01.jpg`,
        telephone: "+81-48-948-7513",
        address: {
          "@type": "PostalAddress",
          addressCountry: "JP",
          addressRegion: company.region,
          addressLocality: company.locality,
          streetAddress: company.street,
          ...(company.postalCode ? { postalCode: company.postalCode } : {}),
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "08:00",
            closes: "17:00",
          },
        ],
        areaServed: AREA_SERVED,
        knowsAbout: works.map((w) => w.title),
        numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
        employee: { "@type": "Person", name: company.representativeName, jobTitle: "代表取締役" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: company.name,
        inLanguage: "ja",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** 事業紹介：提供している工事の一覧 */
export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${company.name}の事業内容`,
    itemListElement: works.map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: w.title,
        description: w.summary,
        serviceType: w.title,
        provider: { "@id": ORG_ID },
        areaServed: AREA_SERVED,
        url: `${SITE_URL}/service#work-${w.no}`,
      },
    })),
  };
}
