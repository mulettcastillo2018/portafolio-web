import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isProduction = process.env.NODE_ENV === "production";

// Política de contenido: solo recursos del propio sitio. 'unsafe-inline' en scripts
// es necesario porque las páginas son estáticas: Next y next-themes insertan scripts
// en línea y los nonces exigirían renderizar cada página por petición. Solo se aplica
// en producción, porque el servidor de desarrollo usa eval y websockets para recargar.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  ...(isProduction
    ? [
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        { key: "Content-Security-Policy", value: contentSecurityPolicy },
      ]
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      // /admin (Decap CMS) solo se usa en local con su propio servidor; se deja
      // fuera para no romperlo si alguien lo abre con `next start`.
      { source: "/((?!admin).*)", headers: securityHeaders },
    ];
  },
};

export default withNextIntl(nextConfig);
