import { CircleCheck, GitBranch, MessageCircle, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { buttonVariants } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/constants";

// Ventana de código decorativa: cómo se ve una automatización con un agente de IA.
// Es una ilustración: el código sigue el idioma del sitio.
const CODIGO = {
  es: { archivo: "automatizacion.ts", var: "reporte", obj: "agente", fn: "ejecutar", tarea: "tarea", que: "consolidar ventas del mes", fuentes: "fuentes", correo: "correo", revision: "revision", humana: "humana", nota: "// pruebas ✓  documentación ✓" },
  en: { archivo: "automation.ts", var: "report", obj: "agent", fn: "run", tarea: "task", que: "consolidate monthly sales", fuentes: "sources", correo: "email", revision: "review", humana: "human", nota: "// tests ✓  docs ✓" },
};

function VentanaCodigo({ c }: { c: (typeof CODIGO)["es"] }) {
  const linea = "flex gap-4 whitespace-pre";
  const num = "w-4 shrink-0 text-right text-muted-foreground/50 select-none";
  return (
    <div aria-hidden className="relative">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-linear-to-br from-degradado-desde/25 via-degradado-medio/15 to-degradado-hasta/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/80 shadow-flotante backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">{c.archivo}</span>
        </div>
        <pre className="overflow-hidden px-5 py-5 font-mono text-[13px] leading-7">
          <code>
            <span className={linea}>
              <span className={num}>1</span>
              <span>
                <span className="text-degradado-desde">const</span> {c.var} = <span className="text-degradado-desde">await</span> {c.obj}.
                <span className="text-degradado-hasta">{c.fn}</span>({"{"}
              </span>
            </span>
            <span className={linea}>
              <span className={num}>2</span>
              <span>
                {"  "}{c.tarea}: <span className="text-exito">&quot;{c.que}&quot;</span>,
              </span>
            </span>
            <span className={linea}>
              <span className={num}>3</span>
              <span>
                {"  "}{c.fuentes}: [<span className="text-exito">&quot;excel&quot;</span>, <span className="text-exito">&quot;erp&quot;</span>, <span className="text-exito">&quot;{c.correo}&quot;</span>],
              </span>
            </span>
            <span className={linea}>
              <span className={num}>4</span>
              <span>
                {"  "}{c.revision}: <span className="text-exito">&quot;{c.humana}&quot;</span>,
              </span>
            </span>
            <span className={linea}>
              <span className={num}>5</span>
              <span>{"});"}</span>
            </span>
            <span className={linea}>
              <span className={num}>6</span>
              <span className="text-muted-foreground">{c.nota}</span>
            </span>
          </code>
        </pre>
      </div>

      <span className="glass-pill absolute -top-5 -left-6 flex animate-flotar items-center gap-2 rounded-2xl px-3.5 py-2.5 text-xs font-semibold shadow-elevada">
        <Sparkles size={15} className="text-accent" /> Claude Code
      </span>
      <span className="glass-pill absolute -right-5 bottom-10 flex animate-flotar items-center gap-2 rounded-2xl px-3.5 py-2.5 text-xs font-semibold shadow-elevada [animation-delay:-3s]">
        <CircleCheck size={15} className="text-exito" /> TypeScript · Next.js
      </span>
      <span className="glass-pill absolute -bottom-6 left-10 flex animate-flotar items-center gap-2 rounded-2xl px-3.5 py-2.5 text-xs font-semibold shadow-elevada [animation-delay:-5s] [animation-duration:10s]">
        <GitBranch size={15} className="text-degradado-hasta" /> GitHub Actions
      </span>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const tWhatsapp = useTranslations("whatsapp");
  const locale = useLocale();

  return (
    <section className="relative">
      <div aria-hidden className="fondo-grilla pointer-events-none absolute inset-x-0 -top-24 h-[46rem]" />
      <Container className="relative grid items-center gap-16 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[1.12fr_1fr] lg:gap-12 lg:pt-24 lg:pb-24">
        <div className="animate-aparecer">
          <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide text-accent uppercase">
            <Sparkles size={14} />
            {t("greeting")}
          </span>
          <h1 className="mt-6 text-5xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-6xl xl:text-7xl">
            <span className="text-gradient animate-brillo">{t("name")}</span>
          </h1>
          <p className="mt-6 text-xl font-medium text-pretty text-foreground/85 sm:text-2xl">{t("tagline")}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">{t("description")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/projects" className={buttonVariants({ size: "lg" })}>
              {t("ctaProjects")}
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              {t("ctaContact")}
            </Link>
            <a
              href={getWhatsAppUrl(tWhatsapp("message"))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              <MessageCircle />
              {tWhatsapp("label")}
            </a>
          </div>
        </div>

        <div className="hidden animate-emerger px-6 [animation-delay:150ms] sm:block lg:px-0">
          <VentanaCodigo c={locale === "en" ? CODIGO.en : CODIGO.es} />
        </div>
      </Container>
    </section>
  );
}
