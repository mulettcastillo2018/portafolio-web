import { cn } from "@/lib/utils";

/** Encabezado de sección: antetítulo opcional con trazo de marca, título grande y bajada. */
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
    <div className={cn("mb-12 max-w-3xl sm:mb-14", className)}>
      {eyebrow ? (
        <p className="mb-4 inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          <span aria-hidden className="h-px w-7 bg-linear-to-r from-degradado-desde to-degradado-hasta" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">{heading}</h2>
      {subheading ? <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">{subheading}</p> : null}
    </div>
  );
}
