import { cn } from "@/lib/utils";

// Bandera de Colombia en SVG (los emojis de banderas no se ven en Windows):
// amarillo la mitad superior, azul y rojo un cuarto cada uno. El borde fino
// evita que el amarillo se pierda sobre el fondo claro.
export function BanderaColombia({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("inline-flex shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10 dark:ring-white/15", className)}>
      <svg viewBox="0 0 3 2" width={18} height={12} className="block">
        <rect width="3" height="1" fill="#FCD116" />
        <rect y="1" width="3" height="0.5" fill="#003893" />
        <rect y="1.5" width="3" height="0.5" fill="#CE1126" />
      </svg>
    </span>
  );
}
