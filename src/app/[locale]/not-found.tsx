import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <Container className="flex flex-col items-center gap-5 pt-24 pb-32 text-center">
      <p aria-hidden className="text-gradient animate-brillo text-8xl font-semibold tracking-tighter sm:text-9xl">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{t("heading")}</h1>
      <p className="max-w-md text-lg text-pretty text-muted-foreground">{t("description")}</p>
      <Link href="/" className={buttonVariants({ size: "lg", className: "mt-4" })}>
        {t("backHome")}
      </Link>
    </Container>
  );
}
