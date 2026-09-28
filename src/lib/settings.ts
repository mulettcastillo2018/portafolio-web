import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/routing";

const SETTINGS_DIR = path.join(process.cwd(), "content", "settings");

function readSettingsFile<T>(name: string, locale: Locale): T {
  const filePath = path.join(SETTINGS_DIR, `${name}-${locale}.json`);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  priceNote: string;
  featured?: boolean;
  features: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function getServices(locale: Locale): ServiceItem[] {
  return readSettingsFile<{ items: ServiceItem[] }>("services", locale).items;
}

export function getPricingPlans(locale: Locale): PricingPlan[] {
  return readSettingsFile<{ plans: PricingPlan[] }>("pricing", locale).plans;
}

export function getFaqItems(locale: Locale): FaqItem[] {
  return readSettingsFile<{ items: FaqItem[] }>("faq", locale).items;
}

export interface TechGroup {
  icon: string;
  title: string;
  items: string[];
  usedIn?: string[];
}

export function getTechStack(locale: Locale): TechGroup[] {
  return readSettingsFile<{ groups: TechGroup[] }>("techstack", locale).groups;
}
