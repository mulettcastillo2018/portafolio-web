import { getTranslations } from "next-intl/server";
import { LayoutTemplate, Server, Database, Radio, ShieldCheck, CreditCard, Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTechStack } from "@/lib/settings";
import type { Locale } from "@/i18n/routing";

const ICONS = {
  frontend: LayoutTemplate,
  backend: Server,
  database: Database,
  realtime: Radio,
  security: ShieldCheck,
  integrations: CreditCard,
} as const;

export async function TechStack({ locale }: { locale: Locale }) {
  const t = await getTranslations("techStack");
  const groups = getTechStack(locale);

  return (
    <section id="tecnologias" className="py-24 sm:py-28">
      <Container>
        <SectionHeading heading={t("heading")} subheading={t("subheading")} className="revelar" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {groups.map((group) => {
            const Icon = ICONS[group.icon as keyof typeof ICONS] ?? Layers;
            return (
              <article key={group.title} className="glass-card revelar flex h-full flex-col rounded-3xl p-6 sm:p-7">
                <div className="flex items-center gap-3.5">
                  <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-degradado-desde to-degradado-hasta text-white shadow-acento">
                    <Icon size={18} />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{group.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
                {group.usedIn && group.usedIn.length > 0 ? (
                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap items-center gap-1.5 border-t border-border pt-4 text-xs text-muted-foreground">
                      <span className="mr-1 font-semibold text-foreground">{t("usedIn")}:</span>
                      {group.usedIn.map((proyecto) => (
                        <span key={proyecto} className="rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent">
                          {proyecto}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
