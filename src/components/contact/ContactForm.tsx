"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { CircleCheck, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/lib/constants";

type Status = "idle" | "sending" | "success" | "error";

// Campos con el anillo de foco del sistema de diseño.
const inputClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-foreground shadow-[inset_0_1px_1px_rgb(0_0_0/0.03)] transition-[border-color,box-shadow] duration-200 ease-salida hover:border-border-strong focus:border-accent focus:ring-4 focus:ring-accent/15 focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium";

function Field({
  id,
  label,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input id={id} name={id} type={type} required={required} className={`${inputClass} h-11`} />
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tContact = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Momento en que el formulario se mostró en el navegador (antispam del servidor).
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    const form = event.currentTarget;
    const field = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)
        ?.value ?? "";

    const data = {
      name: field("name"),
      email: field("email"),
      message: field("message"),
      company: field("company"),
      phone: field("phone"),
      currentProcess: field("currentProcess"),
      budget: field("budget"),
      timeline: field("timeline"),
      website: field("website"),
      startedAt: startedAt.current ?? undefined,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setErrorMessage(res.status === 429 ? t("errorRateLimit") : null);
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="grid animate-emerger place-items-center gap-4 py-12 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-exito/10 text-exito ring-8 ring-exito/5">
          <CircleCheck size={30} />
        </span>
        <p className="max-w-sm text-lg font-semibold text-pretty">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Campo trampa para bots: invisible para las personas y fuera del orden de tabulación. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="name" label={t("name")} required />
      <Field id="email" label={t("email")} type="email" required />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="company" label={t("company")} />
        <Field id="phone" label={t("phone")} type="tel" />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t("message")}
        </label>
        <textarea id="message" name="message" required rows={5} className={`${inputClass} py-3`} />
      </div>

      <div>
        <label htmlFor="currentProcess" className={labelClass}>
          {t("currentProcess")}
        </label>
        <textarea id="currentProcess" name="currentProcess" rows={3} className={`${inputClass} py-3`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="budget" label={t("budget")} />
        <Field id="timeline" label={t("timeline")} />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? t("sending") : t("submit")}
      </Button>

      {status === "error" ? (
        <p role="alert" className="flex gap-2.5 rounded-xl bg-peligro/10 px-4 py-3 text-sm text-peligro ring-1 ring-peligro/20 ring-inset">
          <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden />
          <span>
          {errorMessage ?? t("error")}{" "}
          {t("errorFallback")}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
          .
          </span>
        </p>
      ) : null}

      <p className="text-xs text-muted-foreground">
        {tContact("directEmail")}{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
          {CONTACT_EMAIL}
        </a>
      </p>
    </form>
  );
}
