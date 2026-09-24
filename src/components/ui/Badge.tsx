import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "glass-pill inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
