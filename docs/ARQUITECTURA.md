# Arquitectura del proyecto — Portafolio web

Documentación técnica de referencia: qué hace cada parte del código y por qué está construida así. Pensada para volver a este proyecto en el futuro y entender rápido cómo funciona todo.

> Mantener actualizado: cuando se agregue/cambie algo estructural (una colección de contenido, una ruta nueva, un cambio de stack), actualizar la sección correspondiente aquí.

## 1. Stack y decisiones clave

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | Next.js 16 (App Router, Turbopack) | Está muy demandado en el mercado, SSG/SSR nativo, buen SEO. |
| Lenguaje | TypeScript | Tipado en todo el contenido y componentes. |
| Estilos | Tailwind CSS v4 | Utilidades + tokens de color propios (`globals.css`), sin librería de componentes externa. |
| Internacionalización | `next-intl` | Rutas `/es` y `/en`, mensajes en `messages/*.json`. |
| Contenido | Markdown + frontmatter (`content/`) | Sin base de datos; se lee del filesystem en build/request time. |
| Panel de administración | Decap CMS (modo local, proxy) | Editar contenido con formularios sin tocar código. Ver sección 8. |
| Email de contacto | Resend (opcional) | El formulario funciona sin romperse aunque no esté configurado. |
| Hosting objetivo | Vercel | Pendiente de conectar (ver `README.md`). |

**No hay base de datos.** Todo el contenido editable vive como archivos `.md` dentro de `content/`. Esto es intencional: en Vercel el filesystem de producción es de solo lectura, así que cualquier "guardado" tiene que pasar por git (commit), no por escribir en producción.

**ESLint no está instalado.** Se quitó del scaffold inicial porque sus dependencias nativas (`ajv`, `damerau-levenshtein`, etc.) eran bloqueadas por el proxy corporativo de la red donde se desarrolló. Se puede reinstalar con `npm install -D eslint eslint-config-next` si hace falta.

## 2. Estructura de carpetas

```
portafolio-web/
├── content/                  # Todo el contenido editable (Markdown + frontmatter)
│   ├── projects/*.md
│   └── blog/{es,en}/*.md
├── messages/                 # Textos de la interfaz (i18n)
│   ├── es.json
│   └── en.json
├── public/
│   └── admin/                # (vacío; el admin real es una ruta de Next, ver sección 8)
├── src/
│   ├── middleware.ts          # Enrutamiento por idioma (next-intl)
│   ├── i18n/                  # Configuración de next-intl
│   │   ├── routing.ts
│   │   ├── navigation.ts
│   │   └── request.ts
│   ├── lib/
│   │   ├── types.ts            # Tipos Project / BlogPost
│   │   ├── content.ts          # Lectura y parseo de los .md
│   │   └── utils.ts             # Helper cn() (clsx + tailwind-merge)
│   ├── components/
│   │   ├── ui/                  # Botones, cards, badges, etc. (genéricos)
│   │   ├── layout/               # Header, Footer, ThemeToggle, LocaleSwitcher, MobileNav
│   │   ├── sections/              # Hero, Skills, FeaturedProjects, CTASection (home)
│   │   ├── projects/               # ProjectCard
│   │   ├── blog/                    # PostCard
│   │   └── contact/                  # ContactForm
│   └── app/
│       ├── [locale]/                  # TODO el sitio público (es/en)
│       │   ├── layout.tsx               # Layout raíz real (<html>/<body>, providers)
│       │   ├── page.tsx                  # Home
│       │   ├── about/page.tsx
│       │   ├── projects/page.tsx
│       │   ├── projects/[slug]/page.tsx
│       │   ├── blog/page.tsx
│       │   ├── blog/[slug]/page.tsx
│       │   ├── contact/page.tsx
│       │   └── not-found.tsx
│       ├── admin/                      # Panel de Decap CMS (fuera de [locale])
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── api/contact/route.ts        # Endpoint del formulario de contacto
│       ├── sitemap.ts
│       ├── robots.ts
│       └── globals.css                  # Tokens de color + estilos base + .markdown-body
└── package.json
```

## 3. Internacionalización (`next-intl`)

- `src/i18n/routing.ts`: define los locales soportados (`es`, `en`) y el default (`es`).
- `src/middleware.ts`: intercepta cada request y decide qué locale servir (o redirige `/` → `/es`). El matcher excluye `api`, `admin`, `_next`, `_vercel` y cualquier ruta con punto (archivos estáticos).
- `src/i18n/request.ts`: carga el archivo de mensajes correcto (`messages/es.json` o `messages/en.json`) según el locale de la request.
- `src/i18n/navigation.ts`: exporta `Link`, `useRouter`, `usePathname` "conscientes del locale" — usarlos en vez de los de `next/navigation` para que los enlaces mantengan el idioma actual automáticamente.
- Todo el texto de la interfaz (nav, hero, botones, formularios) vive en `messages/es.json` / `messages/en.json`, **no** hardcodeado en los componentes. Se accede con el hook `useTranslations("namespace")` (client/server components) o `getTranslations()` (funciones async en server components).

**Importante:** `src/app/layout.tsx` (el archivo raíz "de verdad" de Next) **no existe**. El layout raíz real es `src/app/[locale]/layout.tsx`, que es el que pone `<html lang={locale}>` y `<body>`. Esto es válido en Next.js cuando todas las rutas públicas cuelgan de `[locale]`. La excepción es `/admin`, que tiene su propio `src/app/admin/layout.tsx` con su propio `<html>/<body>` mínimo (ver sección 8).

## 4. Contenido (Markdown)

- `src/lib/types.ts` define la forma de un `Project` y un `BlogPost`.
- `src/lib/content.ts` es la única pieza que lee del filesystem:
  - `getAllProjects()` / `getProjectBySlug(slug)` → leen `content/projects/*.md`.
  - `getAllPosts(locale)` / `getPostBySlug(locale, slug)` → leen `content/blog/{locale}/*.md`.
  - Usa `gray-matter` para separar el frontmatter (YAML) del cuerpo, y `remark` + `remark-html` para convertir el cuerpo Markdown a HTML (`contentHtml`), que luego se inyecta con `dangerouslySetInnerHTML` en las páginas de detalle (`projects/[slug]`, `blog/[slug]`) dentro de un contenedor con la clase `.markdown-body` (estilos definidos a mano en `globals.css`, sin plugin de Tailwind Typography).
- El **nombre del archivo** `.md` es el `slug` de la URL (ej. `ejemplo-proyecto.md` → `/es/projects/ejemplo-proyecto`).
- Campos de un proyecto (frontmatter): `title`, `summary`, `stack` (lista), `role`, `year`, `featured` (bool, controla si sale en "Proyectos destacados" del home), `order` (para ordenar la lista), `links.demo`, `links.repo`, `image` (opcional).
- Campos de un post: `title`, `date` (`YYYY-MM-DD`), `summary`, `tags` (lista).

## 5. Componentes

- **`components/ui/`**: piezas genéricas sin lógica de negocio — `Button` (y `buttonVariants` para estilar `<Link>` como botón), `Card`, `Badge`, `Container` (ancho máximo + padding lateral), `SectionHeading`.
- **`components/layout/`**: `Header` (nav + logo + selector de idioma + toggle de tema + `MobileNav` para el menú responsive), `Footer` (email de contacto, año dinámico), `ThemeProvider`/`ThemeToggle` (envuelven `next-themes`, dark mode vía clase `.dark` en `<html>`, ver `globals.css`), `LocaleSwitcher` (botones ES/EN).
- **`components/sections/`**: bloques usados solo en el home (`Hero`, `Skills`, `FeaturedProjects` — este último es un *server component* async que llama a `getAllProjects()` directamente —, `CTASection`).
- **`components/projects/ProjectCard.tsx`** y **`components/blog/PostCard.tsx`**: tarjetas reutilizadas tanto en el home como en las páginas de listado.
- **`components/contact/ContactForm.tsx`**: client component con estado local (`idle/sending/success/error`), hace `fetch("/api/contact", { method: "POST" })`.

## 6. Formulario de contacto

- `src/app/api/contact/route.ts`: valida el body con `zod`, y si `RESEND_API_KEY` y `CONTACT_TO_EMAIL` están configuradas (variables de entorno), envía el correo con `resend`. Si no están configuradas, responde `503` con un mensaje controlado — el formulario en el cliente muestra entonces el email de contacto como alternativa (`mailtoFallback` en los mensajes i18n). Nunca rompe la build ni el sitio por falta de configuración.
- Variables de entorno relevantes están documentadas en `.env.example`.

## 7. SEO

- `src/app/sitemap.ts` y `src/app/robots.ts` generan `sitemap.xml`/`robots.txt` dinámicamente, recorriendo ambos locales y todo el contenido (`getAllProjects`/`getAllPosts`).
- Cada página define su propio `generateMetadata()` usando las traducciones correspondientes (título, descripción).
- No hay imágenes Open Graph generadas dinámicamente todavía (pendiente si se quiere pulir más el SEO social).

## 8. Panel de administración (Decap CMS)

El objetivo: poder crear/editar proyectos y posts con formularios, sin tocar los `.md` a mano, **sin necesitar base de datos ni cuenta externa** (modo 100% local).

Piezas:
- `src/app/admin/page.tsx`: client component que importa `decap-cms-app` dinámicamente (`import("decap-cms-app")`) dentro de un `useEffect`, y llama a `CMS.init({ config })`. La config define 3 colecciones (`projects`, `blog_es`, `blog_en`) que apuntan exactamente a las carpetas de `content/` y replican los campos de `src/lib/types.ts`. No se usa un `config.yml` separado — la config vive inline en TypeScript (tipada con `CmsConfig` de `decap-cms-core`).
- `src/app/admin/layout.tsx`: layout mínimo propio con `<html>/<body>`, porque `/admin` no cuelga de `[locale]` (ver sección 3).
- `src/middleware.ts` excluye explícitamente `admin` de su matcher, para que next-intl no intente redirigir `/admin` a `/es/admin`.
- **`decap-server`** (paquete devDependency, comando `npm run cms`): es un pequeño servidor Express que corre en local y le permite al panel leer/escribir directamente los archivos del repo, sin necesidad de GitHub OAuth ni Tina Cloud ni ningún backend remoto. El panel (`/admin`) le habla a este servidor vía `backend: { name: "proxy", proxy_url: "http://localhost:8085/api/v1" }`.

### Puerto 8085 (no 8081)

El puerto por defecto de `decap-server` es **8081**, pero en el equipo de desarrollo ese puerto ya estaba ocupado por un servicio de McAfee (`macmnsvc`), lo que causaba errores confusos de "404" / "Failed to fetch" en el panel. Por eso:
- `package.json` → `"cms": "set PORT=8085 && decap-server"`.
- `src/app/admin/page.tsx` → `proxy_url: "http://localhost:8085/api/v1"`.

Si se mueve este proyecto a otra máquina y el puerto 8085 también estuviera ocupado, hay que cambiar el número en **ambos** lugares (deben coincidir).

### Cómo usarlo día a día

1. Terminal 1: `npm run cms` (dev the corriendo, sirve en `localhost:8085`).
2. Terminal 2: `npm run dev` (Next.js, sirve en `localhost:3000`).
3. Abrir `http://localhost:3000/admin` en el navegador.
4. Editar/crear contenido → botón **"Publicar ahora"** (en modo "simple" no hay borradores separados: ese botón guarda directo en el archivo `.md`).
5. Los cambios quedan como archivos modificados/nuevos en el working directory de git — hay que hacer `git add` + `git commit` (y luego `push`) para que queden guardados en el historial y se reflejen en el deploy.

Este panel **solo funciona en local** (no está expuesto en producción/Vercel). Es exclusivamente una herramienta de edición para quien tiene el repo clonado en su máquina.

## 9. Entorno de desarrollo (notas del equipo donde se construyó)

Estas notas son específicas de la máquina/red donde se desarrolló originalmente el proyecto — probablemente no aplican si se abre en otro equipo, pero quedan documentadas por si se repite el patrón:

- Node.js y Git **no** están en el PATH del sistema por defecto; se instalaron como versiones portables en `%LOCALAPPDATA%\Programs\node-v26.10.0-win-x64` y `%LOCALAPPDATA%\Programs\Git`. Cualquier terminal nueva necesita tener esas rutas en el `PATH` (ya quedaron agregadas al PATH de usuario de Windows de forma permanente).
- La red corporativa (proxy McAfee Web Gateway) hace inspección TLS y bloquea la descarga de ciertos paquetes de npm (sobre todo binarios nativos compilados: `@next/swc-*`, `@tailwindcss/oxide-*`, `esbuild`, etc.), y a veces paquetes JS sueltos por coincidencia de patrones de contenido. Se necesita `NODE_OPTIONS=--use-system-ca` para que Node confíe en el certificado del proxy. Cuando un paquete específico es bloqueado (error `403 MediaTypeBlocked` en el log de npm), la solución que funcionó fue: identificar la URL exacta del `.tgz` en `registry.npmjs.org`, descargarlo manualmente desde el navegador, y cargarlo con `npm cache add archivo.tgz` antes de reintentar `npm install`.

## 10. Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Sitio en desarrollo, `localhost:3000` |
| `npm run cms` | Panel de administración (Decap), `localhost:8085` |
| `npm run build` | Build de producción (valida TypeScript y genera todas las páginas estáticas) |
| `npm run start` | Sirve el build de producción localmente |

## 11. Pendientes conocidos

- Subir el repo a GitHub y desplegar en Vercel (ver `README.md`).
- Reemplazar el proyecto de ejemplo (`content/projects/ejemplo-proyecto.md`) por proyectos reales.
- Agregar enlaces de GitHub/LinkedIn en `Footer.tsx` cuando se quiera.
- Configurar Resend si se quiere que el formulario de contacto envíe correos de verdad.
- El "middleware" (`src/middleware.ts`) aparece marcado como convención "deprecated" en los logs de build de Next 16 (recomienda migrar a "proxy.ts"), pero sigue funcionando normalmente — es solo una advertencia, no un error.
