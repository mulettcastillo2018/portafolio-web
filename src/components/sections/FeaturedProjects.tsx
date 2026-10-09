import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonVariants } from "@/components/ui/Button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getAllProjects } from "@/lib/content";
import type { Locale } from "@/i18n/routing";

export async function FeaturedProjects() {
  const t = await getTranslations("featuredProjects");
  const locale = (await getLocale()) as Locale;
  const projects = await getAllProjects(locale);
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const list = featured.length > 0 ? featured : projects.slice(0, 3);

  if (list.length === 0) return null;

  return (
    <section className="relative border-y border-border bg-surface/40 py-24 sm:py-28">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <SectionHeading heading={t("heading")} subheading={t("subheading")} className="revelar mb-0 sm:mb-0" />
          <Link href="/projects" className={buttonVariants({ variant: "secondary", className: "group revelar" })}>
            {t("viewAll")}
            <ArrowRight className="transition-transform duration-300 ease-resorte group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
