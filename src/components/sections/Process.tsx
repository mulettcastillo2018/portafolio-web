import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section className="border-t border-border bg-muted/30">
      <Container className="py-16">
        <SectionHeading heading={t("heading")} subheading={t("subheading")} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="relative">
              <span className="text-gradient text-4xl font-black">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
