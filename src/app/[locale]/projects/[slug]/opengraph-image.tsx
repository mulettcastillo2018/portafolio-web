import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { SITE_NAME } from "@/lib/seo";

// Tarjeta propia de cada caso de estudio, para compartirlo en LinkedIn.
export const size = ogSize;
export const contentType = ogContentType;
export const alt = SITE_NAME;

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const project of await getAllProjects(locale)) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "og" });
  const project = await getProjectBySlug(locale as Locale, slug);

  // "Tienda virtual — e-commerce colombiano" → título y subtítulo
  const [name, ...rest] = (project?.title ?? SITE_NAME).split(" — ");
  const tagline = rest.join(" — ");
  const stack = (project?.stack ?? []).filter((tech) => tech !== "Claude Code");

  return renderOgImage({
    eyebrow: t("caseStudy"),
    title: name,
    subtitle: tagline ? tagline.charAt(0).toUpperCase() + tagline.slice(1) : "",
    chips: [...stack.slice(0, 4), "Claude Code"],
    footer: SITE_NAME,
  });
}
