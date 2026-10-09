"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export type EnlaceNav = { href: string; label: string };

export const esActivo = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

/** Navegación de escritorio: la sección actual queda marcada con una pastilla. */
export function NavLinks({ links }: { links: EnlaceNav[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Principal" className="hidden items-center gap-0.5 lg:flex">
      {links.map((link) => {
        const activo = esActivo(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={activo ? "page" : undefined}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200",
              activo ? "bg-foreground/[0.07] text-foreground dark:bg-white/[0.08]" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
