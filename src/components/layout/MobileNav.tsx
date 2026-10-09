"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { esActivo, type EnlaceNav } from "./NavLinks";

export function MobileNav({ links, etiqueta }: { links: EnlaceNav[]; etiqueta: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Escape cierra el menú.
  useEffect(() => {
    if (!open) return;
    const alTecla = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", alTecla);
    return () => document.removeEventListener("keydown", alTecla);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="grid size-9 place-items-center rounded-full text-foreground transition-colors duration-200 hover:bg-muted"
        aria-label={etiqueta}
        aria-expanded={open}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
      {open ? (
        <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] origin-top animate-emerger rounded-3xl border border-border bg-surface/90 p-3 shadow-flotante backdrop-blur-xl backdrop-saturate-150">
          <nav aria-label={etiqueta} className="grid gap-1">
            {links.map((link) => {
              const activo = esActivo(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={activo ? "page" : undefined}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-base font-medium transition-colors duration-200",
                    activo ? "bg-foreground/[0.07] text-foreground dark:bg-white/[0.08]" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-2 border-t border-border px-2 pt-3">
            <LocaleSwitcher />
          </div>
        </div>
      ) : null}
    </>
  );
}
