import { notFound } from "next/navigation";

// Cualquier ruta que no exista dentro de un idioma muestra el not-found traducido
// de [locale], con el encabezado y el pie del sitio, en lugar del 404 genérico de Next.
export default function CatchAllPage() {
  notFound();
}
