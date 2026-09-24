import { Mail } from "lucide-react";

export function ContactIllustration() {
  return (
    <div className="glass-card relative mx-auto flex aspect-square w-full max-w-xs items-center justify-center overflow-hidden rounded-3xl">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" fill="none">
        <defs>
          <linearGradient id="signal-ring" x1="0" y1="0" x2="200" y2="200">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="90" stroke="url(#signal-ring)" strokeWidth="1.5" opacity="0.25" />
        <circle cx="100" cy="100" r="65" stroke="url(#signal-ring)" strokeWidth="1.5" opacity="0.45" />
        <circle cx="100" cy="100" r="40" stroke="url(#signal-ring)" strokeWidth="1.5" opacity="0.7" />
      </svg>
      <div className="glass-pill relative flex h-16 w-16 items-center justify-center rounded-full text-accent">
        <Mail size={26} />
      </div>
    </div>
  );
}
