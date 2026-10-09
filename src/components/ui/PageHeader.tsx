import { cn } from "@/lib/utils";

/** Título de página (h1) con bajada y, opcionalmente, una ilustración al lado. */
export function PageHeader({
  title,
  description,
  aside,
  className,
}: {
  title: string;
  description?: string;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-14 flex flex-wrap items-center justify-between gap-10 sm:mb-16", className)}>
      <div className="max-w-3xl animate-aparecer">
        <h1 className="text-4xl leading-[1.06] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">{title}</h1>
        {description ? <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">{description}</p> : null}
      </div>
      {aside ? <div className="animate-emerger [animation-delay:120ms]">{aside}</div> : null}
    </header>
  );
}
