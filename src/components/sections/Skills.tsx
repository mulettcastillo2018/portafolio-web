import { useTranslations } from "next-intl";
import { Sparkles, Workflow, Code2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AIPowerIllustration } from "@/components/sections/AIPowerIllustration";

const CATEGORY_ICONS = {
  aiAssistants: Sparkles,
  automation: Workflow,
  development: Code2,
  practices: ShieldCheck,
} as const;

export function Skills() {
  const t = useTranslations("skills");
  const categories = Object.keys(CATEGORY_ICONS) as (keyof typeof CATEGORY_ICONS)[];

  return (
    <section>
      <Container className="py-16">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <SectionHeading heading={t("heading")} subheading={t("subheading")} />
          <AIPowerIllustration />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map((key) => {
            const Icon = CATEGORY_ICONS[key];
            const items = t.raw(`categories.${key}.items`) as string[];

            return (
              <Card key={key}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-semibold">
                    {t(`categories.${key}.title`)}
                  </h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
