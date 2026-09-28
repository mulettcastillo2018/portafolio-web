import { ChevronDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFaqItems } from "@/lib/settings";
import type { Locale } from "@/i18n/routing";

export async function FAQ({ locale }: { locale: Locale }) {
  const t = await getTranslations("faq");
  const items = getFaqItems(locale);

  return (
    <section className="border-t border-border bg-muted/30">
      <Container className="py-16">
        <SectionHeading heading={t("heading")} subheading={t("subheading")} />

        <div className="mx-auto max-w-2xl space-y-3">
          {items.map((item) => (
            <details key={item.question} className="glass-card group rounded-2xl p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {item.question}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
