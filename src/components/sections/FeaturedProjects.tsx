import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getAllProjects } from "@/lib/content";

export async function FeaturedProjects() {
  const t = await getTranslations("featuredProjects");
  const projects = await getAllProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const list = featured.length > 0 ? featured : projects.slice(0, 3);

  if (list.length === 0) return null;

  return (
    <section className="border-t border-border bg-muted/30">
      <Container className="py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            heading={t("heading")}
            subheading={t("subheading")}
          />
          <Link href="/projects" className="text-sm font-semibold text-accent">
            {t("viewAll")} →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
