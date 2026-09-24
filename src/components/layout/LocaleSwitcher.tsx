"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border p-1 text-xs font-semibold">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={
            loc === locale
              ? "rounded-full bg-accent px-2.5 py-1 text-accent-foreground"
              : "rounded-full px-2.5 py-1 text-muted-foreground hover:text-foreground"
          }
          aria-current={loc === locale}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
