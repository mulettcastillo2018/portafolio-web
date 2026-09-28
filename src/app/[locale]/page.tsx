import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Skills } from "@/components/sections/Skills";
import { TechStack } from "@/components/sections/TechStack";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Services locale={locale as Locale} />
      <Process />
      <Skills />
      <TechStack locale={locale as Locale} />
      <FeaturedProjects />
      <Pricing locale={locale as Locale} />
      <FAQ locale={locale as Locale} />
      <CTASection />
    </>
  );
}
