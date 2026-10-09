# Sistema de diseño

Rediseño de 2026: apariencia limpia y de alta gama sin cambiar contenido ni funcionalidad. Todo sale de
unos pocos tokens en `src/app/globals.css` y se usa con clases utilitarias de Tailwind 4.

## Temas e identidad

- Claro y oscuro profundo con el mismo nombre de tokens (interruptor de `next-themes`, clase `.dark`).
- Identidad violeta → índigo → cian (`degradado-desde`, `degradado-medio`, `degradado-hasta`).
- Tipografía Geist y Geist Mono (cifras, código y fechas).

## Tokens y utilidades

- **Superficies:** `background`, `surface`, `surface-2`, `card` (vidrio), `border`, `border-strong`.
- **Texto:** `foreground`, `muted-foreground`; acento `accent`; estados `exito` y `peligro`.
- **Sombras:** `shadow-suave`, `shadow-elevada`, `shadow-flotante`, `shadow-acento`.
- **Movimiento:** `ease-resorte`, `ease-salida`, `animate-aparecer`, `animate-emerger`, `animate-flotar`, `animate-brillo`.
- **Utilidades propias (`@utility`):** `glass-card`, `glass-pill`, `btn-gradient`, `text-gradient`, `borde-degradado`,
  `fondo-grilla` y `revelar` (aparece al entrar en pantalla, solo con CSS; respeta "reducir movimiento").

## Componentes base (`src/components/ui`)

| Componente | Uso |
| --- | --- |
| `Button` / `buttonVariants()` | `primary`, `secondary`, `ghost`; tamaños `sm`, `md`, `lg` |
| `Card`, `Badge` | Tarjeta de vidrio e insignia |
| `Container` | Ancho de página: `angosto` (lectura), `normal`, `amplio` |
| `SectionHeading` / `PageHeader` | Título de sección (h2) y de página (h1) |
| `IconoGithub` | Marca de GitHub (lucide ya no trae íconos de marcas) |

`cn` (en `src/lib/utils.ts`) une clases con tailwind-merge extendido con los tokens propios.

## Secciones del rediseño

1. Fundamentos · 2. Cabecera flotante y pie de página · 3. Hero, servicios y proceso ·
4. Habilidades, tecnologías y proyectos · 5. Precios, preguntas y llamado final · 6. Páginas internas.

Las tarjetas de proyecto muestran la captura del proyecto (`image` en el Markdown) en un marco de navegador;
si no hay captura, una portada generada con las iniciales.
