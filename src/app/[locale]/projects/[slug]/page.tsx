import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { IconoGithub } from "@/components/ui/IconoGithub";
import { Portada } from "@/components/projects/ProjectCard";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    const projects = await getAllProjects(locale);
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(locale as Locale, slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: alternatesFor(locale as Locale, `/projects/${slug}`),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const project = await getProjectBySlug(locale as Locale, slug);

  if (!project) notFound();

  return (
    <Container className="pt-12 pb-24 sm:pt-16">
      <Link href="/projects" className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft size={16} className="transition-transform duration-300 ease-resorte group-hover:-translate-x-0.5" />
        {t("backToProjects")}
      </Link>

      <header className="mt-6 max-w-4xl animate-aparecer">
        <h1 className="text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl">{project.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">{project.summary}</p>
      </header>

      <div className="mt-10 animate-emerger [animation-delay:120ms]">
        <Portada project={project} grande />
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
        <article className="markdown-body min-w-0 max-w-3xl" dangerouslySetInnerHTML={{ __html: project.contentHtml }} />

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-suave backdrop-blur-xl">
            <dl className="grid grid-cols-2 gap-5 text-sm">
              <div>
                <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{t("role")}</dt>
                <dd className="mt-1.5 font-medium text-pretty">{project.role}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{t("year")}</dt>
                <dd className="mt-1.5 font-mono font-medium">{project.year}</dd>
              </div>
            </dl>
            {project.links.demo || project.links.repo ? (
              <div className="mt-6 grid gap-2.5">
                {project.links.demo ? (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: "w-full" })}>
                    <ExternalLink />
                    {t("demo")}
                  </a>
                ) : null}
                {project.links.repo ? (
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "secondary", className: "w-full" })}>
                    <IconoGithub size={16} />
                    {t("repo")}
                  </a>
                ) : null}
              </div>
            ) : null}
            <div className="mt-6 border-t border-border pt-5">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
