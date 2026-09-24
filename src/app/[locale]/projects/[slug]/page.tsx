import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, GitBranch } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("projects");
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <Container className="py-16">
      <Link href="/projects" className="text-sm font-semibold text-accent">
        {t("backToProjects")}
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">{project.title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        {project.summary}
      </p>

      <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
        <div>
          <p className="font-semibold text-foreground">{t("role")}</p>
          <p>{project.role}</p>
        </div>
        <div>
          <p className="font-semibold text-foreground">{t("year")}</p>
          <p>{project.year}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        {project.links.demo ? (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent"
          >
            <ExternalLink size={14} />
            {t("demo")}
          </a>
        ) : null}
        {project.links.repo ? (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent"
          >
            <GitBranch size={14} />
            {t("repo")}
          </a>
        ) : null}
      </div>

      <article
        className="markdown-body mt-10 max-w-2xl"
        dangerouslySetInnerHTML={{ __html: project.contentHtml }}
      />
    </Container>
  );
}
