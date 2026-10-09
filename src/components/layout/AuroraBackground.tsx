// Luces de fondo con los colores de la marca: muy suaves para que el contenido
// mande. Fijas detrás de todo el sitio.
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[-22rem] left-1/2 h-[42rem] w-[64rem] -translate-x-1/2 rounded-full bg-degradado-medio/20 blur-[140px] dark:bg-degradado-medio/25" />
      <div className="absolute top-1/3 -left-56 h-[28rem] w-[28rem] rounded-full bg-degradado-hasta/12 blur-[130px] dark:bg-degradado-hasta/10" />
      <div className="absolute -right-48 bottom-[-14%] h-[30rem] w-[30rem] rounded-full bg-degradado-desde/12 blur-[140px] dark:bg-degradado-desde/12" />
    </div>
  );
}
