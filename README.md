# Portafolio web — Andrés Felipe Mulett Castillo

Portafolio profesional construido con Next.js (App Router) + TypeScript + Tailwind CSS, con soporte bilingüe (ES/EN), blog en Markdown y formulario de contacto.

## Correr en local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) (redirige automáticamente a `/es`).

> Nota: este proyecto **no incluye ESLint** por ahora — se quitó temporalmente porque algunas de sus dependencias eran bloqueadas por un proxy corporativo durante el desarrollo. Se puede volver a agregar con `npm install -D eslint eslint-config-next` cuando ya no sea un problema.

## Documentación técnica

Cómo funciona todo por dentro (i18n, contenido, componentes, el panel de admin, etc.) está en [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).

## Estructura del proyecto

```
content/
  projects/*.md       ← un archivo por proyecto (frontmatter: title, summary, stack, role, year, featured, order, links)
  blog/es/*.md         ← posts del blog en español
  blog/en/*.md         ← posts del blog en inglés
messages/
  es.json, en.json     ← todos los textos de la interfaz (nav, hero, skills, formularios, etc.)
src/
  app/[locale]/        ← todas las páginas (home, about, projects, blog, contact)
  app/api/contact/     ← endpoint del formulario de contacto
  components/          ← ui/, layout/, sections/, projects/, blog/, contact/
  lib/content.ts       ← lectura y parseo de los archivos Markdown
  i18n/                ← configuración de next-intl (rutas /es y /en)
```

## Editar contenido

- **Proyectos**: agrega/edita archivos en `content/projects/`. El proyecto de ejemplo (`ejemplo-proyecto.md`) está marcado con `TODO` para que lo reemplaces.
- **Blog**: agrega archivos `.md` en `content/blog/es/` y `content/blog/en/` (mismo `slug`/nombre de archivo en ambos si quieres el post en los dos idiomas).
- **Textos de la interfaz** (hero, "sobre mí", footer, etc.): edita `messages/es.json` y `messages/en.json`.
- **Redes sociales**: agrega tus enlaces de GitHub/LinkedIn en `src/components/layout/Footer.tsx` (hay un comentario `TODO` marcando dónde).
- **Foto de "Sobre mí"**: coloca tu foto como `public/images/profile.jpg` (recomendado: orientación vertical, cuerpo completo). Mientras no exista ese archivo, la página muestra automáticamente una ilustración de código como reemplazo — en cuanto agregues el archivo con ese nombre exacto, se usa tu foto sin tocar código.

## Formulario de contacto

El endpoint `src/app/api/contact/route.ts` usa [Resend](https://resend.com) para enviar los mensajes por correo. Sin las variables de entorno configuradas, el formulario responde con un error controlado y muestra el email de contacto como alternativa (no rompe la build).

1. Crea una cuenta gratuita en [resend.com](https://resend.com) y genera un API key.
2. Copia `.env.example` a `.env.local` y completa:
   ```
   RESEND_API_KEY=tu_api_key
   CONTACT_TO_EMAIL=mulettcastillo2013@gmail.com
   ```

## Desplegar en Vercel

1. Sube este proyecto a un repositorio de GitHub (`git remote add origin <url>` + `git push`).
2. En [vercel.com](https://vercel.com), importa el repositorio.
3. Configura las variables de entorno (`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`) en el proyecto de Vercel.
4. Cada push a la rama principal despliega automáticamente.
