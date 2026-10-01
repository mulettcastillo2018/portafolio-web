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
      name: "projects_es",
      label: "Proyectos (Español)",
      folder: "content/projects/es",
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
      name: "projects_en",
      label: "Projects (English)",
      folder: "content/projects/en",
      create: true,
      delete: true,
      slug: "{{slug}}",
      format: "frontmatter",
      fields: [
        { name: "title", label: "Title", widget: "string" },
        { name: "summary", label: "Summary", widget: "text" },
        { name: "stack", label: "Technologies", widget: "list" },
        { name: "role", label: "Role", widget: "string" },
        { name: "year", label: "Year", widget: "number", value_type: "int" },
        { name: "featured", label: "Featured", widget: "boolean", default: false },
        { name: "order", label: "Order", widget: "number", value_type: "int", default: 0 },
        {
          name: "links",
          label: "Links",
          widget: "object",
          fields: [
            { name: "demo", label: "Demo", widget: "string", required: false },
            { name: "repo", label: "Repository", widget: "string", required: false },
          ],
        },
        { name: "image", label: "Image", widget: "image", required: false },
        { name: "body", label: "Content", widget: "markdown" },
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
      label: "Landing (Servicios / Tecnologías / Cómo trabajo / Precios / FAQ)",
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
          name: "aiWorkflowEs",
          label: "Cómo trabajo con IA (Español)",
          file: "content/settings/aiworkflow-es.json",
          fields: [
            {
              name: "stats",
              label: "Cifras",
              widget: "list",
              fields: [
                { name: "value", label: "Valor", widget: "string" },
                { name: "label", label: "Texto", widget: "string" },
              ],
            },
            {
              name: "steps",
              label: "Pasos del método",
              widget: "list",
              fields: [
                { name: "title", label: "Título", widget: "string" },
                { name: "who", label: "Quién", widget: "string" },
                { name: "description", label: "Descripción", widget: "text" },
              ],
            },
            { name: "mine", label: "Mi papel", widget: "list" },
            { name: "agent", label: "Papel del agente", widget: "list" },
            {
              name: "decisions",
              label: "Decisiones",
              widget: "list",
              fields: [
                { name: "decision", label: "Decisión", widget: "string" },
                { name: "why", label: "Por qué", widget: "text" },
                { name: "project", label: "Proyecto (slug)", widget: "string" },
              ],
            },
            { name: "practices", label: "Prácticas", widget: "list" },
            {
              name: "constraints",
              label: "Restricciones",
              widget: "list",
              fields: [
                { name: "problem", label: "Problema", widget: "string" },
                { name: "solution", label: "Solución", widget: "text" },
              ],
            },
            { name: "tools", label: "Herramientas", widget: "list" },
          ],
        },
        {
          name: "aiWorkflowEn",
          label: "How I work with AI (English)",
          file: "content/settings/aiworkflow-en.json",
          fields: [
            {
              name: "stats",
              label: "Stats",
              widget: "list",
              fields: [
                { name: "value", label: "Value", widget: "string" },
                { name: "label", label: "Label", widget: "string" },
              ],
            },
            {
              name: "steps",
              label: "Method steps",
              widget: "list",
              fields: [
                { name: "title", label: "Title", widget: "string" },
                { name: "who", label: "Who", widget: "string" },
                { name: "description", label: "Description", widget: "text" },
              ],
            },
            { name: "mine", label: "My role", widget: "list" },
            { name: "agent", label: "Agent role", widget: "list" },
            {
              name: "decisions",
              label: "Decisions",
              widget: "list",
              fields: [
                { name: "decision", label: "Decision", widget: "string" },
                { name: "why", label: "Why", widget: "text" },
                { name: "project", label: "Project (slug)", widget: "string" },
              ],
            },
            { name: "practices", label: "Practices", widget: "list" },
            {
              name: "constraints",
              label: "Constraints",
              widget: "list",
              fields: [
                { name: "problem", label: "Problem", widget: "string" },
                { name: "solution", label: "Solution", widget: "text" },
              ],
            },
            { name: "tools", label: "Tools", widget: "list" },
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
