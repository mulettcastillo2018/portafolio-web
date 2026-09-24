const CODE_LINES = [
  { width: "70%", color: "#a855f7" },
  { width: "45%", color: "#22d3ee" },
  { width: "85%", color: "#f472b6" },
  { width: "55%", color: "#34d399" },
  { width: "65%", color: "#a855f7" },
  { width: "40%", color: "#22d3ee" },
  { width: "75%", color: "#fbbf24" },
  { width: "50%", color: "#a855f7" },
];

export function CodeIllustration() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-400/10 p-8">
      <span className="text-gradient pointer-events-none absolute -right-4 -top-8 select-none text-[8rem] font-black leading-none opacity-20">
        {"</>"}
      </span>

      <div className="relative">
        <div className="mb-5 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>

        <div className="space-y-3">
          {CODE_LINES.map((line, i) => (
            <div
              key={i}
              className="h-2.5 rounded-full opacity-80"
              style={{ width: line.width, backgroundColor: line.color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
