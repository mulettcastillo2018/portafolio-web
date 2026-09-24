import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="border-b border-border">
      <Container className="py-20 sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {t("greeting")}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {t("name")}
        </h1>
        <p className="mt-4 text-xl font-medium text-muted-foreground">
          {t("tagline")}
        </p>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/projects" className={buttonVariants({ variant: "primary" })}>
            {t("ctaProjects")}
          </Link>
          <Link href="/contact" className={buttonVariants({ variant: "secondary" })}>
            {t("ctaContact")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
