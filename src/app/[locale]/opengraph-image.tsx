import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { SITE_NAME } from "@/lib/seo";

// Imagen por defecto al compartir cualquier página del sitio. Las páginas con su
// propio opengraph-image.tsx (casos de estudio, "Cómo trabajo con IA") la reemplazan.
export const size = ogSize;
export const contentType = ogContentType;
export const alt = SITE_NAME;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "og" });
  const tHero = await getTranslations({ locale, namespace: "hero" });

  return renderOgImage({
    eyebrow: t("site"),
    title: SITE_NAME,
    subtitle: tHero("tagline"),
    chips: ["Next.js", "Node.js", "PostgreSQL", "Claude Code"],
    footer: "github.com/mulettcastillo2018",
  });
}
