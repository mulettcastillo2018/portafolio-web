import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/lib/types";

const MAX_STACK = 6;

// Iniciales del proyecto para la portada generada ("Comidas rápidas — ..." → "CR").
function iniciales(titulo: string) {
  const nombre = titulo.split(/[—–:-]/)[0].trim();
  return nombre
    .split(/\s+/)
    .filter((p) => p.length > 2 || /^[A-Z]/.test(p))
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

/** Portada: la captura del proyecto en un marco de navegador o, si no hay, una generada. */
function Portada({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border bg-surface-2">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
          <span className="size-2 rounded-full bg-muted-foreground/30" />
          <span className="size-2 rounded-full bg-muted-foreground/30" />
          <span className="size-2 rounded-full bg-muted-foreground/30" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt=""
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-salida group-hover:scale-[1.03]"
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="relative grid aspect-[16/10] place-items-center overflow-hidden rounded-2xl border border-border bg-linear-to-br from-degradado-desde/25 via-degradado-medio/15 to-degradado-hasta/25"
    >
      <div className="fondo-grilla absolute inset-0 [mask-image:none]" />
      <span className="text-gradient relative text-6xl font-semibold tracking-tight transition-transform duration-700 ease-resorte group-hover:scale-110">
        {iniciales(project.title)}
      </span>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("featuredProjects");
  const extra = project.stack.length - MAX_STACK;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="glass-card group revelar flex h-full flex-col rounded-3xl p-3 sm:p-4"
    >
      <Portada project={project} />
      <div className="flex flex-1 flex-col px-2 pt-5 pb-2 sm:px-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg leading-snug font-semibold tracking-tight text-balance">{project.title}</h3>
          <span className="shrink-0 font-mono text-xs text-muted-foreground">{project.year}</span>
        </div>
        <p className="mt-2.5 line-clamp-3 leading-relaxed text-pretty text-muted-foreground">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, MAX_STACK).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
          {extra > 0 ? <Badge className="text-accent">+{extra}</Badge> : null}
        </div>
        <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold text-accent">
          {t("viewProject")}
          <ArrowUpRight size={16} className="transition-transform duration-300 ease-resorte group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
