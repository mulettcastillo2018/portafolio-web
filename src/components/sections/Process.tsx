import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonVariants } from "@/components/ui/Button";

// Línea de tiempo: en escritorio los pasos se unen con una línea de degradado;
// en el celular, en columna con la línea a la izquierda.
export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section className="relative border-y border-border bg-surface/40 py-24 sm:py-28">
      <Container>
        <SectionHeading heading={t("heading")} subheading={t("subheading")} className="revelar" />
        <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
          <span
            aria-hidden
            className="absolute top-6 right-[12%] left-[12%] hidden h-px bg-linear-to-r from-degradado-desde via-degradado-medio to-degradado-hasta opacity-50 lg:block"
          />
          <span
            aria-hidden
            className="absolute top-6 bottom-6 left-6 w-px bg-linear-to-b from-degradado-desde via-degradado-medio to-degradado-hasta opacity-40 lg:hidden"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="revelar relative flex gap-5 lg:block">
              <span className="borde-degradado relative grid size-12 shrink-0 place-items-center rounded-full font-mono text-sm font-semibold shadow-suave lg:mx-auto">
                <span className="text-gradient">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <div className="lg:mt-6 lg:text-center">
                <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="revelar mt-14 flex lg:justify-center">
          <Link href="/how-i-work" className={buttonVariants({ variant: "secondary", className: "group" })}>
            {t("viewMethod")}
            <ArrowRight className="transition-transform duration-300 ease-resorte group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
