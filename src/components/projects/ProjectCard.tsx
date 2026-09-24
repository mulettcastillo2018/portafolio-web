import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("featuredProjects");

  return (
    <Card className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <span className="text-xs text-muted-foreground">{project.year}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent"
      >
        {t("viewProject")}
        <ArrowUpRight size={14} />
      </Link>
    </Card>
  );
}
