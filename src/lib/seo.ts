import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

// URL pública del sitio para los enlaces absolutos (sitemap, robots, canonical,
// imágenes para redes). Orden: NEXT_PUBLIC_SITE_URL si se definió; si no, el
// dominio de producción que Vercel entrega al compilar (el más corto del
// proyecto, p. ej. mulett.vercel.app); y en local, localhost.
const VERCEL_PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || VERCEL_PRODUCTION_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "Andrés Felipe Mulett Castillo";

export const OG_LOCALES: Record<Locale, string> = { es: "es_CO", en: "en_US" };

// URL canónica de la página y sus versiones en cada idioma (hreflang), para que
// Google no trate /es y /en como contenido duplicado. `path` va sin idioma
// ("" es el inicio). Si la página no existe con la misma ruta en los dos
// idiomas (los posts del blog tienen slugs distintos), se pasa `sameInAllLocales: false`.
export function alternatesFor(
  locale: Locale,
  path: string,
  { sameInAllLocales = true }: { sameInAllLocales?: boolean } = {}
): Metadata["alternates"] {
  const canonical = `/${locale}${path}`;
  if (!sameInAllLocales) return { canonical };

  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = `/${l}${path}`;
  languages["x-default"] = `/${routing.defaultLocale}${path}`;

  return { canonical, languages };
}
