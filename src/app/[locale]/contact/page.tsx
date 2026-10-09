import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactIllustration } from "@/components/sections/ContactIllustration";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("heading"),
    description: t("subheading"),
    alternates: alternatesFor(locale as Locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <Container className="pt-16 pb-24 sm:pt-20">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <PageHeader title={t("heading")} description={t("subheading")} className="mb-10 sm:mb-12" />
          <div className="hidden lg:block">
            <ContactIllustration />
          </div>
        </div>
        <div className="animate-emerger rounded-[2rem] border border-border bg-card p-6 shadow-elevada backdrop-blur-xl [animation-delay:120ms] sm:p-9">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
