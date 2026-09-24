"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "success" | "error";

const CONTACT_EMAIL = "mulettcastillo2013@gmail.com";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent";

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
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <input id={id} name={id} type={type} required={required} className={inputClass} />
    </div>
  );
}

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tContact = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setErrorMessage(body?.error ?? null);
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
    return <p className="text-sm font-medium text-accent">{t("success")}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field id="name" label={t("name")} required />
      <Field id="email" label={t("email")} type="email" required />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="company" label={t("company")} />
        <Field id="phone" label={t("phone")} type="tel" />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          {t("message")}
        </label>
        <textarea id="message" name="message" required rows={5} className={inputClass} />
      </div>

      <div>
        <label htmlFor="currentProcess" className="mb-1 block text-sm font-medium">
          {t("currentProcess")}
        </label>
        <textarea id="currentProcess" name="currentProcess" rows={3} className={inputClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="budget" label={t("budget")} />
        <Field id="timeline" label={t("timeline")} />
      </div>

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? t("sending") : t("submit")}
      </Button>

      {status === "error" ? (
        <p className="text-sm text-red-500">
          {errorMessage ?? t("error")}{" "}
          {t("errorFallback")}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
          .
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
