import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { getPricingPlans } from "@/lib/settings";
import type { Locale } from "@/i18n/routing";

export async function Pricing({ locale }: { locale: Locale }) {
  const t = await getTranslations("pricing");
  const plans = getPricingPlans(locale);

  return (
    <section id="precios" className="py-24 sm:py-28">
      <Container>
        <SectionHeading heading={t("heading")} subheading={t("subheading")} className="revelar" />
        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "revelar relative flex h-full flex-col rounded-3xl p-7 sm:p-8",
                plan.featured
                  ? "borde-degradado shadow-[0_30px_70px_-30px] shadow-degradado-medio/60"
                  : "glass-card"
              )}
            >
              {plan.featured ? (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-8 -top-px h-px bg-linear-to-r from-transparent via-white/70 to-transparent"
                />
              ) : null}
              <h3 className={cn("font-semibold tracking-tight", plan.featured && "text-gradient")}>{plan.name}</h3>
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-4xl font-semibold tracking-tight tabular-nums">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.priceNote}</span>
              </p>
              <div className="my-6 h-px bg-border" />
              <ul className="flex-1 space-y-3 text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-pretty">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={buttonVariants({
                  variant: plan.featured ? "primary" : "secondary",
                  size: "lg",
                  className: "mt-8 w-full shrink-0",
                })}
              >
                {t("cta")}
              </Link>
            </article>
          ))}
        </div>
        <p className="revelar mt-10 text-sm text-pretty text-muted-foreground">{t("disclaimer")}</p>
      </Container>
    </section>
  );
}
