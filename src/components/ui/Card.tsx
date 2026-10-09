import { cn } from "@/lib/utils";

/** Tarjeta de vidrio esmerilado: borde fino, desenfoque y sombra suave. */
export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("glass-card rounded-3xl p-6 sm:p-7", className)}>{children}</div>;
}
