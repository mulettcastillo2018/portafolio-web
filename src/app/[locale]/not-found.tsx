import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight">{t("heading")}</h1>
      <p className="text-muted-foreground">{t("description")}</p>
      <Link href="/" className={buttonVariants({ variant: "primary" })}>
        {t("backHome")}
      </Link>
    </Container>
  );
}
