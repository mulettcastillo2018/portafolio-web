"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function MobileNav({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
        aria-label="Menu"
        aria-expanded={open}
      >
        {open ? <X size={16} /> : <Menu size={16} />}
      </button>

      {open ? (
        <div className="absolute inset-x-0 top-16 border-b border-border bg-background p-4 shadow-sm">
          <nav className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4">
            <LocaleSwitcher />
          </div>
        </div>
      ) : null}
    </>
  );
}
