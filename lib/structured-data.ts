import { company, DEFAULT_DESCRIPTION, SITE_URL } from "@/lib/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    alternateName: company.nameEn,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
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
    areaServed: ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"].map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    numberOfEmployees: { "@type": "QuantitativeValue", value: 10 },
    employee: { "@type": "Person", name: company.representativeName, jobTitle: "代表取締役" },
  };
}
