import { getTranslations } from "next-intl/server";
import {
  LayoutTemplate,
  Server,
  Database,
  Radio,
  ShieldCheck,
  CreditCard,
  Layers,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
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
    <section id="tecnologias" className="border-t border-border">
      <Container className="py-16">
        <SectionHeading heading={t("heading")} subheading={t("subheading")} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const Icon = ICONS[group.icon as keyof typeof ICONS] ?? Layers;
            return (
              <Card key={group.title} className="flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-semibold">{group.title}</h3>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>

                {group.usedIn && group.usedIn.length > 0 ? (
                  <p className="mt-auto pt-5 text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{t("usedIn")}:</span>{" "}
                    {group.usedIn.join(" · ")}
                  </p>
                ) : null}
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
