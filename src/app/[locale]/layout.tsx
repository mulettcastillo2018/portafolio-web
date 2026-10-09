import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { OG_LOCALES, SITE_NAME, SITE_URL } from "@/lib/seo";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuroraBackground } from "@/components/layout/AuroraBackground";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import "../globals.css";

// Geist: sans-serif variable, muy legible y con cifras tabulares; Next la sirve desde el sitio.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const ogLocale = OG_LOCALES[locale as Locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: t("titleTemplate"),
      default: t("defaultTitle"),
    },
    description: t("defaultDescription"),
    // Solo lo común a todo el sitio: cada página aporta su título y descripción
    // (Next los copia a og:title/og:description) y la imagen sale de opengraph-image.tsx.
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: ogLocale,
      alternateLocale: Object.values(OG_LOCALES).filter((l) => l !== ogLocale),
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <ThemeProvider>
            <AuroraBackground />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
