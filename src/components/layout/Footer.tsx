import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";

const CONTACT_EMAIL = "mulettcastillo2013@gmail.com";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>
          © {year} Andrés Felipe Mulett Castillo. {t("rights")}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Mail size={16} />
            {CONTACT_EMAIL}
          </a>
          {/* TODO: agrega aquí tus enlaces de GitHub/LinkedIn cuando los tengas listos */}
        </div>
      </Container>
    </footer>
  );
}
