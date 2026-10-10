export const WHATSAPP_NUMBER = "573043714862";
// El mismo número para mostrar: +57 304 371 4862.
export const WHATSAPP_DISPLAY = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 5)} ${WHATSAPP_NUMBER.slice(5, 8)} ${WHATSAPP_NUMBER.slice(8)}`;
export const CONTACT_EMAIL = "mulettcastillo2013@gmail.com";
export const GITHUB_URL = "https://github.com/mulettcastillo2018";
export const LINKEDIN_URL = "https://www.linkedin.com/in/mulett-andres/";

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
