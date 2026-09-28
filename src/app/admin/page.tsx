"use client";

import { useEffect } from "react";
import type { CmsConfig } from "decap-cms-core";

const cmsConfig: CmsConfig = {
  backend: {
    name: "proxy",
    proxy_url: "http://localhost:8085/api/v1",
    branch: "master",
  },
  media_folder: "public/images/uploads",
  public_folder: "/images/uploads",
  collections: [
    {
      name: "projects",
      label: "Proyectos",
      folder: "content/projects",
      create: true,
      delete: true,
      slug: "{{slug}}",
      format: "frontmatter",
      fields: [
        { name: "title", label: "Título", widget: "string" },
        { name: "summary", label: "Resumen", widget: "text" },
        { name: "stack", label: "Tecnologías", widget: "list" },
        { name: "role", label: "Rol", widget: "string" },
        { name: "year", label: "Año", widget: "number", value_type: "int" },
        { name: "featured", label: "Destacado", widget: "boolean", default: false },
        { name: "order", label: "Orden", widget: "number", value_type: "int", default: 0 },
        {
          name: "links",
          label: "Enlaces",
          widget: "object",
          fields: [
            { name: "demo", label: "Demo", widget: "string", required: false },
            { name: "repo", label: "Repositorio", widget: "string", required: false },
          ],
        },
        { name: "image", label: "Imagen", widget: "image", required: false },
        { name: "body", label: "Contenido", widget: "markdown" },
      ],
    },
    {
      name: "blog_es",
      label: "Blog (Español)",
      folder: "content/blog/es",
      create: true,
      delete: true,
      slug: "{{slug}}",
      format: "frontmatter",
      fields: [
        { name: "title", label: "Título", widget: "string" },
        {
          name: "date",
          label: "Fecha",
          widget: "datetime",
          date_format: "YYYY-MM-DD",
          time_format: false,
        },
        { name: "summary", label: "Resumen", widget: "text" },
        { name: "tags", label: "Etiquetas", widget: "list" },
        { name: "body", label: "Contenido", widget: "markdown" },
      ],
    },
    {
      name: "blog_en",
      label: "Blog (English)",
      folder: "content/blog/en",
      create: true,
      delete: true,
      slug: "{{slug}}",
      format: "frontmatter",
      fields: [
        { name: "title", label: "Title", widget: "string" },
        {
          name: "date",
          label: "Date",
          widget: "datetime",
          date_format: "YYYY-MM-DD",
          time_format: false,
        },
        { name: "summary", label: "Summary", widget: "text" },
        { name: "tags", label: "Tags", widget: "list" },
        { name: "body", label: "Content", widget: "markdown" },
      ],
    },
    {
      name: "settings",
      label: "Landing (Servicios / Tecnologías / Precios / FAQ)",
      files: [
        {
          name: "servicesEs",
          label: "Servicios (Español)",
          file: "content/settings/services-es.json",
          fields: [
            {
              name: "items",
              label: "Servicios",
              widget: "list",
              fields: [
                { name: "title", label: "Título", widget: "string" },
                { name: "description", label: "Descripción", widget: "text" },
              ],
            },
          ],
        },
        {
          name: "servicesEn",
          label: "Services (English)",
          file: "content/settings/services-en.json",
          fields: [
            {
              name: "items",
              label: "Services",
              widget: "list",
              fields: [
                { name: "title", label: "Title", widget: "string" },
                { name: "description", label: "Description", widget: "text" },
              ],
            },
          ],
        },
        {
          name: "techStackEs",
          label: "Tecnologías (Español)",
          file: "content/settings/techstack-es.json",
          fields: [
            {
              name: "groups",
              label: "Grupos",
              widget: "list",
              fields: [
                {
                  name: "icon",
                  label: "Ícono",
                  widget: "select",
                  options: ["frontend", "backend", "database", "realtime", "security", "integrations"],
                },
                { name: "title", label: "Título", widget: "string" },
                { name: "items", label: "Tecnologías", widget: "list" },
                { name: "usedIn", label: "Usado en (proyectos)", widget: "list", required: false },
              ],
            },
          ],
        },
        {
          name: "techStackEn",
          label: "Technologies (English)",
          file: "content/settings/techstack-en.json",
          fields: [
            {
              name: "groups",
              label: "Groups",
              widget: "list",
              fields: [
                {
                  name: "icon",
                  label: "Icon",
                  widget: "select",
                  options: ["frontend", "backend", "database", "realtime", "security", "integrations"],
                },
                { name: "title", label: "Title", widget: "string" },
                { name: "items", label: "Technologies", widget: "list" },
                { name: "usedIn", label: "Used in (projects)", widget: "list", required: false },
              ],
            },
          ],
        },
        {
          name: "pricingEs",
          label: "Precios (Español)",
          file: "content/settings/pricing-es.json",
          fields: [
            {
              name: "plans",
              label: "Planes",
              widget: "list",
              fields: [
                { name: "name", label: "Nombre", widget: "string" },
                { name: "price", label: "Precio", widget: "string" },
                { name: "priceNote", label: "Nota (ej. 'por mes')", widget: "string" },
                { name: "featured", label: "Destacado", widget: "boolean", default: false },
                { name: "features", label: "Incluye", widget: "list" },
              ],
            },
          ],
        },
        {
          name: "pricingEn",
          label: "Pricing (English)",
          file: "content/settings/pricing-en.json",
          fields: [
            {
              name: "plans",
              label: "Plans",
              widget: "list",
              fields: [
                { name: "name", label: "Name", widget: "string" },
                { name: "price", label: "Price", widget: "string" },
                { name: "priceNote", label: "Note (e.g. 'per month')", widget: "string" },
                { name: "featured", label: "Featured", widget: "boolean", default: false },
                { name: "features", label: "Includes", widget: "list" },
              ],
            },
          ],
        },
        {
          name: "faqEs",
          label: "FAQ (Español)",
          file: "content/settings/faq-es.json",
          fields: [
            {
              name: "items",
              label: "Preguntas",
              widget: "list",
              fields: [
                { name: "question", label: "Pregunta", widget: "string" },
                { name: "answer", label: "Respuesta", widget: "text" },
              ],
            },
          ],
        },
        {
          name: "faqEn",
          label: "FAQ (English)",
          file: "content/settings/faq-en.json",
          fields: [
            {
              name: "items",
              label: "Questions",
              widget: "list",
              fields: [
                { name: "question", label: "Question", widget: "string" },
                { name: "answer", label: "Answer", widget: "text" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default function AdminPage() {
  useEffect(() => {
    let cancelled = false;

    import("decap-cms-app").then(({ default: CMS }) => {
      if (!cancelled) {
        CMS.init({ config: cmsConfig });
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
