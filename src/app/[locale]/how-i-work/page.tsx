import type { Metadata } from "next";
import { ArrowUpRight, Bot, Check, Lightbulb, UserRound, Wrench } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { getAiWorkflow } from "@/lib/settings";
import { getAllProjects } from "@/lib/content";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "howIWork" });
  return {
    title: t("heading"),
    description: t("intro"),
    alternates: alternatesFor(locale as Locale, "/how-i-work"),
  };
}

export default async function HowIWorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("howIWork");
  const workflow = getAiWorkflow(locale as Locale);
  const projects = await getAllProjects(locale as Locale);
  // "Comidas rápidas — pedidos en tiempo real..." → "Comidas rápidas"
  const projectNames = new Map(
    projects.map((p) => [p.slug, p.title.split(" — ")[0]])
  );

  return (
    <>
      <section>
        <Container className="pt-16 pb-20 sm:pt-20">
          <div className="max-w-3xl">
            <h1 className="animate-aparecer text-4xl leading-[1.06] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {t("heading")}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-pretty text-foreground/85">{t("intro")}</p>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">{t("note")}</p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {workflow.stats.map((stat) => (
              <Card key={stat.label} className="revelar p-6">
                <p className="text-gradient text-4xl font-semibold tracking-tight">{stat.value}</p>
                <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface/40">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            heading={t("methodHeading")}
            subheading={t("methodSubheading")}
          />

          <ol className="space-y-4">
            {workflow.steps.map((step, i) => (
              <li
                key={step.title}
                className="glass-card revelar flex flex-col gap-3 rounded-3xl p-7 sm:flex-row sm:gap-7"
              >
                <span className="text-gradient font-mono text-3xl leading-none font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                    <Badge className="text-accent">{step.who}</Badge>
                  </div>
                  <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-border">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            heading={t("rolesHeading")}
            subheading={t("rolesSubheading")}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <RoleCard icon={<UserRound size={18} />} title={t("mine")} items={workflow.mine} />
            <RoleCard icon={<Bot size={18} />} title={t("agent")} items={workflow.agent} />
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface/40">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            heading={t("decisionsHeading")}
            subheading={t("decisionsSubheading")}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workflow.decisions.map((item) => (
              <Card key={item.decision} className="revelar flex flex-col justify-between">
                <div>
                  <Lightbulb size={18} className="text-accent" />
                  <h3 className="mt-3 font-semibold">{item.decision}</h3>
                  <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">{item.why}</p>
                </div>
                {projectNames.has(item.project) ? (
                  <Link
                    href={`/projects/${item.project}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent"
                  >
                    {t("viewCase")}: {projectNames.get(item.project)}
                    <ArrowUpRight size={14} />
                  </Link>
                ) : null}
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border">
        <Container className="py-20 sm:py-24">
          <SectionHeading
            heading={t("practicesHeading")}
            subheading={t("practicesSubheading")}
          />

          <ul className="grid gap-x-8 gap-y-4 md:grid-cols-2">
            {workflow.practices.map((practice) => (
              <li key={practice} className="flex gap-3 text-muted-foreground">
                <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                <span>{practice}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border bg-surface/40">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <SectionHeading
              heading={t("constraintsHeading")}
              subheading={t("constraintsSubheading")}
            />
            <div className="space-y-4">
              {workflow.constraints.map((item) => (
                <Card key={item.problem} className="revelar p-6">
                  <p className="font-semibold">{item.problem}</p>
                  <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">{item.solution}</p>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading heading={t("toolsHeading")} />
            <ul className="space-y-3">
              {workflow.tools.map((tool) => (
                <li key={tool} className="flex gap-3 text-muted-foreground">
                  <Wrench size={16} className="mt-1 shrink-0 text-accent" />
                  <span>{tool}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t border-border">
        <Container className="py-20 sm:py-24">
          <Card className="borde-degradado revelar flex flex-col items-center gap-5 px-6 py-14 text-center shadow-elevada">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {t("ctaHeading")}
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground">{t("ctaDescription")}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className={buttonVariants({ variant: "primary", size: "lg" })}>
                {t("ctaButton")}
              </Link>
              <Link href="/projects" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                {t("ctaProjects")}
              </Link>
            </div>
          </Card>
        </Container>
      </section>
    </>
  );
}

function RoleCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/15 ring-inset">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <Check size={16} className="mt-0.5 shrink-0 text-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
