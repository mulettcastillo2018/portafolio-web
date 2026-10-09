import { getTranslations } from "next-intl/server";
import { Workflow, Plug, LineChart, Settings2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getServices } from "@/lib/settings";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

const ICONS = [Workflow, Plug, LineChart, Settings2] as const;

// Grilla bento asimétrica: en escritorio las tarjetas alternan anchos (3+2 / 2+3).
const SPANS = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3"];

export async function Services({ locale }: { locale: Locale }) {
  const t = await getTranslations("services");
  const items = getServices(locale);

  return (
    <section id="servicios" className="relative py-20 sm:py-24">
      <Container>
        <SectionHeading heading={t("heading")} subheading={t("subheading")} className="revelar" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const destacado = i === 0;
            return (
              <article
                key={item.title}
                className={cn(
                  "glass-card revelar group relative flex min-h-56 flex-col overflow-hidden rounded-3xl p-7 sm:p-8",
                  SPANS[i % SPANS.length]
                )}
              >
                {destacado ? (
                  <div
                    aria-hidden
                    className="absolute -top-24 -right-20 size-72 rounded-full bg-linear-to-br from-degradado-desde/25 to-degradado-hasta/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
                  />
                ) : null}
                <div className="relative flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-degradado-desde to-degradado-hasta text-white shadow-acento transition-transform duration-500 ease-resorte group-hover:scale-110 group-hover:-rotate-6">
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/70">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="relative mt-auto pt-10 text-xl font-semibold tracking-tight text-balance">{item.title}</h3>
                <p className="relative mt-2.5 max-w-md leading-relaxed text-pretty text-muted-foreground">{item.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
