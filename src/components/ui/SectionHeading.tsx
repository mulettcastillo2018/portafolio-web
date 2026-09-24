export function SectionHeading({
  eyebrow,
  heading,
  subheading,
}: {
  eyebrow?: string;
  heading: string;
  subheading?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
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
