import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  return { title: t("heading") };
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
    <Container className="py-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("heading")}</h1>
          <p className="mt-6 text-lg text-muted-foreground">{t("intro")}</p>
          <div className="mt-8 space-y-4 text-base text-muted-foreground">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="glass-card relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-3xl p-0">
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
    </Container>
  );
}
