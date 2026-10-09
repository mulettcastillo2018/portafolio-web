"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="size-9" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group grid size-9 place-items-center rounded-full text-foreground transition-colors duration-200 hover:bg-muted"
      aria-label={isDark ? "Activar tema claro" : "Activar tema oscuro"}
    >
      <span key={isDark ? "sol" : "luna"} className="grid animate-emerger place-items-center transition-transform duration-500 ease-resorte group-hover:rotate-12">
        {isDark ? <Sun size={17} /> : <Moon size={17} />}
      </span>
    </button>
  );
}
