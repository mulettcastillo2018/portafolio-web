import { PenLine } from "lucide-react";

const LINES = ["85%", "60%", "70%", "40%", "75%", "55%"];

export function BlogIllustration() {
  return (
    <div className="glass-card relative hidden h-40 w-full max-w-xs shrink-0 items-center overflow-hidden rounded-2xl sm:flex sm:h-48">
      <div className="w-full space-y-2.5 p-8">
        {LINES.map((width, i) => (
          <div
            key={i}
            className="h-2 rounded-full bg-muted-foreground/25"
            style={i === 0 ? { width, background: "var(--accent)", opacity: 0.6 } : { width }}
          />
        ))}
      </div>
      <div className="glass-pill absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-accent">
        <PenLine size={16} />
      </div>
    </div>
  );
}
