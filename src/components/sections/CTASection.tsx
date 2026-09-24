import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { TimeSavedIllustration } from "@/components/sections/TimeSavedIllustration";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="border-t border-border">
      <Container className="flex flex-col items-center gap-8 py-16 text-center sm:flex-row sm:text-left">
        <TimeSavedIllustration />
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t("heading")}
          </h2>
          <p className="max-w-xl text-muted-foreground">{t("description")}</p>
          <Link href="/contact" className={buttonVariants({ variant: "primary" })}>
            {t("button")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
