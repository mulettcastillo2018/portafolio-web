import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFaqItems } from "@/lib/settings";
import type { Locale } from "@/i18n/routing";

// Preguntas en acordeón: en escritorio el título queda fijo a la izquierda.
export async function FAQ({ locale }: { locale: Locale }) {
  const t = await getTranslations("faq");
  const items = getFaqItems(locale);

  return (
    <section className="border-y border-border bg-surface/40 py-24 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading heading={t("heading")} subheading={t("subheading")} className="revelar mb-0 sm:mb-0" />
        </div>
        <div className="grid gap-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="revelar group rounded-2xl border border-border bg-card px-6 py-5 shadow-suave backdrop-blur-xl transition-colors duration-300 hover:border-border-strong open:border-accent/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground transition-all duration-300 ease-resorte group-open:rotate-45 group-open:bg-accent group-open:text-accent-foreground">
                  <Plus size={16} />
                </span>
              </summary>
              <p className="mt-4 max-w-2xl animate-aparecer leading-relaxed text-pretty text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
