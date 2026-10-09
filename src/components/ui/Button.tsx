import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  // Una acción principal por bloque: el degradado de la marca se reserva para ella.
  primary: "btn-gradient text-white",
  secondary: "glass-pill text-foreground hover:border-border-strong hover:bg-surface",
  ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm [&_svg]:size-4",
  md: "h-11 px-6 text-sm [&_svg]:size-4",
  lg: "h-12 px-7 text-base [&_svg]:size-5",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap select-none",
    "transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-resorte active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />;
}
