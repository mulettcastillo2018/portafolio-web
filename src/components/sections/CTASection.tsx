import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { TimeSavedIllustration } from "@/components/sections/TimeSavedIllustration";

// Llamado final: un panel amplio con luces de la marca.
export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="revelar relative overflow-hidden rounded-[2rem] border border-border bg-surface p-8 shadow-elevada sm:p-12 lg:p-16">
          <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 size-[26rem] rounded-full bg-degradado-desde/25 blur-[110px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 size-[26rem] rounded-full bg-degradado-hasta/20 blur-[110px]" />
          <div aria-hidden className="fondo-grilla pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_80%_at_70%_50%,#000_20%,transparent_80%)]" />
          <div className="relative flex flex-col items-center gap-10 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl lg:leading-[1.08]">{t("heading")}</h2>
              <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">{t("description")}</p>
              <Link href="/contact" className={buttonVariants({ size: "lg", className: "group mt-9" })}>
                {t("button")}
                <ArrowRight className="transition-transform duration-300 ease-resorte group-hover:translate-x-1" />
              </Link>
            </div>
            <TimeSavedIllustration />
          </div>
        </div>
      </Container>
    </section>
  );
}
