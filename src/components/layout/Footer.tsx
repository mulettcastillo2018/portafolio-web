import { useTranslations } from "next-intl";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { IconoGithub } from "@/components/ui/IconoGithub";
import { IconoLinkedin } from "@/components/ui/IconoLinkedin";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL, getWhatsAppUrl, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";
import { Monograma } from "./Header";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tHero = useTranslations("hero");
  const tWhatsapp = useTranslations("whatsapp");
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: tNav("home") },
    { href: "/about", label: tNav("about") },
    { href: "/projects", label: tNav("projects") },
    { href: "/how-i-work", label: tNav("howIWork") },
    { href: "/blog", label: tNav("blog") },
    { href: "/contact", label: tNav("contact") },
  ];

  const enlaceClase = "group inline-flex items-center gap-2 text-muted-foreground transition-colors duration-200 hover:text-foreground";

  return (
    <footer className="mt-24 border-t border-border bg-surface/40 backdrop-blur-sm">
      <Container className="grid gap-12 pt-14 pb-28 text-sm sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] xl:pb-14">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Monograma />
            <span className="font-semibold tracking-tight">Andrés Mulett Castillo</span>
          </div>
          <p className="mt-4 leading-relaxed text-muted-foreground">{tHero("tagline")}</p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-foreground uppercase">{tNav("menu")}</p>
          <ul className="mt-4 grid gap-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={enlaceClase}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-foreground uppercase">{tNav("contact")}</p>
          <ul className="mt-4 grid gap-2.5">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className={enlaceClase}>
                <Mail size={15} /> <span className="break-all">{CONTACT_EMAIL}</span>
              </a>
            </li>
            <li>
              <a href={getWhatsAppUrl(tWhatsapp("message"))} target="_blank" rel="noopener noreferrer" className={enlaceClase}>
                <MessageCircle size={15} /> {tWhatsapp("label")}
                <ArrowUpRight size={13} className="transition-transform duration-200 ease-resorte group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={enlaceClase}>
                <IconoGithub size={15} /> GitHub
                <ArrowUpRight size={13} className="transition-transform duration-200 ease-resorte group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={enlaceClase}>
                <IconoLinkedin size={15} /> LinkedIn
                <ArrowUpRight size={13} className="transition-transform duration-200 ease-resorte group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:col-span-2 sm:flex-row sm:justify-between lg:col-span-3">
          <p>
            © {year} Andrés Felipe Mulett Castillo. {t("rights")}
          </p>
          <p>{t("builtWith")}</p>
        </div>
      </Container>
    </footer>
  );
}
