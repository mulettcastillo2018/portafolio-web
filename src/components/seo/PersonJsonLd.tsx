import { getTranslations } from "next-intl/server";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

// Datos estructurados (schema.org) para que los buscadores sepan quién está detrás del
// sitio y lo relacionen con sus perfiles de LinkedIn y GitHub. Solo datos que ya son
// públicos en la página; no se ejecuta en el navegador.
export async function PersonJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "hero" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#persona`,
        name: SITE_NAME,
        url: `${SITE_URL}/${locale}`,
        jobTitle: t("tagline"),
        description: t("description"),
        address: { "@type": "PostalAddress", addressCountry: "CO" },
        sameAs: [LINKEDIN_URL, GITHUB_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#sitio`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#persona` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
