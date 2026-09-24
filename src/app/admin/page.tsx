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
