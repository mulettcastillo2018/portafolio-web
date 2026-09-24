import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  price: string;
  priceNote: string;
  features: string[];
  featured?: boolean;
}

export function Pricing() {
  const t = useTranslations("pricing");
  const plans = t.raw("plans") as Plan[];

  return (
    <section id="precios" className="border-t border-border">
      <Container className="py-16">
        <SectionHeading heading={t("heading")} subheading={t("subheading")} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col",
                plan.featured && "border-accent/50 shadow-[0_0_0_1px_var(--accent)]"
              )}
            >
              <h3 className="font-semibold">{plan.name}</h3>
              <p className="mt-2">
                <span className="text-2xl font-bold">{plan.price}</span>{" "}
                <span className="text-sm text-muted-foreground">{plan.priceNote}</span>
              </p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={buttonVariants({
                  variant: plan.featured ? "primary" : "secondary",
                  className: "mt-6 w-full",
                })}
              >
                {t("cta")}
              </Link>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{t("disclaimer")}</p>
      </Container>
    </section>
  );
}
