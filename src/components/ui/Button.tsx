import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variantClasses: Record<Variant, string> = {
  primary: "btn-gradient",
  secondary: "glass-pill hover:border-accent/40 text-foreground",
  ghost: "hover:bg-muted text-foreground",
};

export function buttonVariants({
  variant = "primary",
  className,
}: {
  variant?: Variant;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
    className
  );
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={buttonVariants({ variant, className })} {...props} />;
}
