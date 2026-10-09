import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge resuelve choques de clases (la última gana). Se le enseñan los
// tokens propios de globals.css para que los reconozca como colores, sombras...
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "background",
        "surface",
        "surface-2",
        "foreground",
        "muted",
        "muted-foreground",
        "border",
        "border-strong",
        "card",
        "accent",
        "accent-foreground",
        "degradado-desde",
        "degradado-medio",
        "degradado-hasta",
        "exito",
        "peligro",
        "ring",
      ],
      shadow: ["suave", "elevada", "flotante", "acento"],
      ease: ["resorte", "salida"],
      animate: ["aparecer", "emerger", "flotar", "brillo"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
