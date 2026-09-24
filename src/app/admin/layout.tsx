export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // El panel de Decap CMS solo funciona con decap-server corriendo en local.
  // En Vercel (producción) no tiene con qué hablar, así que no tiene sentido
  // servirlo ahí: evita exponer públicamente su bundle de JS (dependencias
  // viejas, sin uso real en ese entorno).
  const isProduction = Boolean(process.env.VERCEL);

  return (
    <html lang="es">
      <body>
        {isProduction ? (
          <p style={{ fontFamily: "sans-serif", padding: "3rem", textAlign: "center" }}>
            Página no encontrada.
          </p>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
