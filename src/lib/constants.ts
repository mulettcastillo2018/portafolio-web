export const WHATSAPP_NUMBER = "573043714862";
export const CONTACT_EMAIL = "mulettcastillo2013@gmail.com";
export const GITHUB_URL = "https://github.com/mulettcastillo2018";
export const LINKEDIN_URL = "https://www.linkedin.com/in/mulett-andres/";

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
