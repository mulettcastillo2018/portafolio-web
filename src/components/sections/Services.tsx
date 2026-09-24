import { useTranslations } from "next-intl";
import { Workflow, Plug, LineChart, Settings2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS = [Workflow, Plug, LineChart, Settings2] as const;

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section id="servicios" className="border-t border-border">
      <Container className="py-16">
        <SectionHeading heading={t("heading")} subheading={t("subheading")} />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Card key={item.title}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
