import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { getAiWorkflow } from "@/lib/settings";
import { SITE_NAME } from "@/lib/seo";

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
  const tPage = await getTranslations({ locale, namespace: "howIWork" });
  const { steps } = getAiWorkflow(locale as Locale);

  return renderOgImage({
    eyebrow: t("method"),
    title: tPage("heading"),
    // Primera oración de la introducción: "Construyo software dirigiendo agentes de IA."
    subtitle: tPage("intro").split(". ")[0] + ".",
    chips: steps.map((step, i) => `${i + 1} · ${step.title}`),
    footer: SITE_NAME,
  });
}
