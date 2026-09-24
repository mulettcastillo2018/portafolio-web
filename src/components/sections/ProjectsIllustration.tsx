export function ProjectsIllustration() {
  return (
    <div className="glass-card relative hidden h-40 w-full max-w-xs shrink-0 items-center justify-center overflow-hidden rounded-2xl sm:flex sm:h-48">
      <svg viewBox="0 0 200 140" className="h-full w-full p-8" fill="none">
        <rect
          x="30"
          y="45"
          width="90"
          height="65"
          rx="10"
          transform="rotate(-8 75 77)"
          stroke="#f472b6"
          strokeWidth="2.5"
        />
        <rect
          x="55"
          y="35"
          width="90"
          height="65"
          rx="10"
          transform="rotate(4 100 67)"
          stroke="#22d3ee"
          strokeWidth="2.5"
        />
        <rect
          x="80"
          y="25"
          width="90"
          height="65"
          rx="10"
          transform="rotate(-2 125 57)"
          stroke="#a855f7"
          strokeWidth="2.5"
          fill="none"
        />
      </svg>
    </div>
  );
}
