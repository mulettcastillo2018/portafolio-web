import { useTranslations } from "next-intl";
import { Sparkles, Workflow, Code2, ShieldCheck, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
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
    <section className="py-24 sm:py-28">
      <Container>
        <div className="mb-12 flex flex-wrap items-center justify-between gap-8 sm:mb-14">
          <SectionHeading heading={t("heading")} subheading={t("subheading")} className="revelar mb-0 sm:mb-0" />
          <div className="revelar">
            <AIPowerIllustration />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {categories.map((key) => {
            const Icon = CATEGORY_ICONS[key];
            const items = t.raw(`categories.${key}.items`) as string[];
            return (
              <article key={key} className="glass-card revelar rounded-3xl p-7 sm:p-8">
                <div className="flex items-center gap-3.5">
                  <span className="grid size-11 place-items-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/15 ring-inset">
                    <Icon size={19} />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{t(`categories.${key}.title`)}</h3>
                </div>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-pretty text-muted-foreground">
                      <Check size={16} className="mt-1 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
