import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  className,
}: {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{heading}</h2>
      {subheading ? (
        <p className="mt-3 text-muted-foreground">{subheading}</p>
      ) : null}
    </div>
  );
}
