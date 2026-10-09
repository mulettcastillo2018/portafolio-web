import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

/** Monograma de la marca personal. */
export function Monograma({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid size-8 shrink-0 place-items-center rounded-full bg-linear-to-br from-degradado-desde via-degradado-medio to-degradado-hasta text-[11px] font-bold tracking-tight text-white shadow-acento ${className}`}
    >
      AM
    </span>
  );
}

// Cabecera en cápsula de vidrio que flota sobre el contenido.
export function Header() {
  const t = useTranslations("nav");
  const tHero = useTranslations("hero");

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/projects", label: t("projects") },
    { href: "/how-i-work", label: t("howIWork") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <div className="glass-pill relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full pr-2 pl-3 shadow-suave sm:pl-4">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5" aria-label="Andrés Mulett Castillo">
          <Monograma className="transition-transform duration-300 ease-resorte group-hover:scale-105 group-hover:-rotate-6" />
          <span className="truncate text-sm font-semibold tracking-tight">Andrés Mulett Castillo</span>
        </Link>

        <NavLinks links={links} />

        <div className="hidden items-center gap-2 lg:flex">
          <LocaleSwitcher />
          <ThemeToggle />
          <Link href="/contact" className={buttonVariants({ size: "sm" })}>
            {tHero("ctaContact")}
          </Link>
        </div>
        <div className="flex items-center gap-1.5 lg:hidden">
          <ThemeToggle />
          <MobileNav links={links} etiqueta={t("menu")} />
        </div>
      </div>
    </header>
  );
}
