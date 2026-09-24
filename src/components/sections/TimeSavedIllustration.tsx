import { Zap } from "lucide-react";

export function TimeSavedIllustration() {
  return (
    <div className="glass-card relative mx-auto flex h-40 w-40 shrink-0 items-center justify-center overflow-hidden rounded-full sm:h-48 sm:w-48">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
        <defs>
          <linearGradient id="time-ring" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="4" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="url(#time-ring)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="264"
          strokeDashoffset="70"
        />
      </svg>
      <Zap className="relative h-10 w-10 text-accent" strokeWidth={2.2} />
    </div>
  );
}
