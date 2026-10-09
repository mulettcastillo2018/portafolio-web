"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex w-fit items-center gap-0.5 rounded-full bg-muted/80 p-0.5 text-xs font-semibold ring-1 ring-border ring-inset">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => router.replace(pathname, { locale: loc })}
          className={cn(
            "rounded-full px-2.5 py-1 transition-all duration-200 ease-salida",
            loc === locale ? "bg-surface text-foreground shadow-suave" : "text-muted-foreground hover:text-foreground"
          )}
          aria-current={loc === locale}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
