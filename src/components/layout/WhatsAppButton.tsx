"use client";

import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { getWhatsAppUrl } from "@/lib/constants";

export function WhatsAppButton() {
  const t = useTranslations("whatsapp");

  return (
    <a
      href={getWhatsAppUrl(t("message"))}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-gradient group fixed right-5 bottom-5 z-30 grid size-14 animate-emerger place-items-center rounded-full shadow-flotante ring-4 ring-background/60 transition-transform duration-300 ease-resorte hover:scale-105 active:scale-95"
      aria-label={t("label")}
      title={t("label")}
    >
      <MessageCircle size={24} className="transition-transform duration-300 ease-resorte group-hover:-rotate-12" />
    </a>
  );
}
