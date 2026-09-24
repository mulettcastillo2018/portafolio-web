export const WHATSAPP_NUMBER = "573043714862";

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
