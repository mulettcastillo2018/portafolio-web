export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute left-1/2 top-[-12%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-violet-500/25 blur-[120px] dark:bg-violet-500/20" />
      <div className="absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-[110px] dark:bg-cyan-400/15" />
      <div className="absolute -right-32 bottom-[-12%] h-[30rem] w-[30rem] rounded-full bg-indigo-500/20 blur-[120px] dark:bg-indigo-500/15" />
    </div>
  );
}
