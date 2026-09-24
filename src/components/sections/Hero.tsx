import { MessageCircle, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { GeometricShapes } from "@/components/layout/GeometricShapes";
import { getWhatsAppUrl } from "@/lib/constants";

export function Hero() {
  const t = useTranslations("hero");
  const tWhatsapp = useTranslations("whatsapp");

  return (
    <section className="relative border-b border-border">
      <GeometricShapes />
      <Container className="relative py-20 sm:py-28">
        <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
          <Sparkles size={14} />
          {t("greeting")}
        </span>
        <h1 className="text-gradient mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">
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
          <a
            href={getWhatsAppUrl(tWhatsapp("message"))}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "secondary" })}
          >
            <MessageCircle size={16} />
            {tWhatsapp("label")}
          </a>
        </div>
      </Container>
    </section>
  );
}
