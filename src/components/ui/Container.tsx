import { cn } from "@/lib/utils";

const ANCHOS = {
  // Lectura cómoda (artículos, casos de estudio).
  angosto: "max-w-3xl",
  normal: "max-w-6xl",
  amplio: "max-w-7xl",
} as const;

/** Ancho y márgenes de página: el contenido respira más a medida que crece la pantalla. */
export function Container({
  className,
  ancho = "normal",
  children,
}: {
  className?: string;
  ancho?: keyof typeof ANCHOS;
  children: React.ReactNode;
}) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", ANCHOS[ancho], className)}>{children}</div>;
}
