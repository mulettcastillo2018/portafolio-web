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
      className="btn-gradient fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full"
      aria-label={t("label")}
    >
      <MessageCircle size={24} />
    </a>
  );
}
