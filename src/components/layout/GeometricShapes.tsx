export function GeometricShapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
      <svg
        className="animate-float-slow absolute right-[6%] top-[8%] h-16 w-16 opacity-70 sm:h-24 sm:w-24"
        viewBox="0 0 100 100"
        fill="none"
      >
        <defs>
          <linearGradient id="rainbow-1" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="75%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="18"
          transform="rotate(18 50 50)"
          stroke="url(#rainbow-1)"
          strokeWidth="3"
        />
      </svg>

      <svg
        className="animate-float absolute left-[4%] top-1/3 h-12 w-12 opacity-60 sm:h-20 sm:w-20"
        viewBox="0 0 100 100"
        fill="none"
      >
        <defs>
          <linearGradient id="rainbow-2" x1="0" y1="100" x2="100" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="35%" stopColor="#06b6d4" />
            <stop offset="70%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="38" stroke="url(#rainbow-2)" strokeWidth="3" />
      </svg>

      <svg
        className="animate-float-slow absolute bottom-[10%] right-[18%] h-10 w-10 opacity-60 sm:h-16 sm:w-16"
        viewBox="0 0 100 100"
        fill="none"
      >
        <defs>
          <linearGradient id="rainbow-3" x1="0" y1="0" x2="100" y2="0">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <polygon
          points="50,8 92,88 8,88"
          transform="rotate(-8 50 50)"
          stroke="url(#rainbow-3)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
