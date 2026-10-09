import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { CodeIllustration } from "@/components/sections/CodeIllustration";

const PROFILE_PHOTO_PATH = path.join(process.cwd(), "public", "images", "profile.jpg");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: alternatesFor(locale as Locale, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const body = t.raw("body") as string[];
  const hasPhoto = fs.existsSync(PROFILE_PHOTO_PATH);

  return (
    <Container className="pt-16 pb-24 sm:pt-20">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <div className="animate-aparecer">
          <h1 className="text-4xl leading-[1.06] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">{t("heading")}</h1>
          <p className="mt-6 text-xl leading-relaxed text-pretty text-foreground/85">{t("intro")}</p>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm animate-emerger [animation-delay:120ms]">
          <div aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-linear-to-br from-degradado-desde/25 via-degradado-medio/15 to-degradado-hasta/20 blur-2xl" />
          <div className="glass-card relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] p-0 shadow-flotante">
            {hasPhoto ? (
              <Image
                src="/images/profile.jpg"
                alt={t("heading")}
                fill
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <CodeIllustration />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
