export function AIPowerIllustration() {
  return (
    <div className="glass-card relative hidden h-40 w-full max-w-xs shrink-0 items-center justify-center overflow-hidden rounded-2xl sm:flex sm:h-48">
      <svg viewBox="0 0 200 140" className="h-full w-full p-6" fill="none">
        <defs>
          <linearGradient id="ai-network" x1="0" y1="0" x2="200" y2="140">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <g stroke="url(#ai-network)" strokeWidth="1.2" opacity="0.8">
          <line x1="100" y1="70" x2="30" y2="25" />
          <line x1="100" y1="70" x2="170" y2="25" />
          <line x1="100" y1="70" x2="25" y2="105" />
          <line x1="100" y1="70" x2="175" y2="110" />
          <line x1="100" y1="70" x2="100" y2="15" />
          <line x1="30" y1="25" x2="100" y2="15" />
          <line x1="170" y1="25" x2="100" y2="15" />
        </g>
        <circle cx="100" cy="70" r="9" fill="url(#ai-network)" />
        <circle cx="30" cy="25" r="5" fill="#a855f7" />
        <circle cx="170" cy="25" r="5" fill="#22d3ee" />
        <circle cx="25" cy="105" r="5" fill="#34d399" />
        <circle cx="175" cy="110" r="5" fill="#f472b6" />
        <circle cx="100" cy="15" r="5" fill="#fbbf24" />
      </svg>
    </div>
  );
}
