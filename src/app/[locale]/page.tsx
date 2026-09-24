import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Skills } from "@/components/sections/Skills";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";

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
      <Services />
      <Process />
      <Skills />
      <FeaturedProjects />
      <Pricing />
      <FAQ />
      <CTASection />
    </>
  );
}
