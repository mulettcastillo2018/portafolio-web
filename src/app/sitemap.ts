import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllProjects, getAllPosts } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const STATIC_PATHS = ["", "/about", "/projects", "/blog", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({ url: `${SITE_URL}/${locale}${path}` });
    }

    const projects = await getAllProjects();
    for (const project of projects) {
      entries.push({ url: `${SITE_URL}/${locale}/projects/${project.slug}` });
    }

    const posts = await getAllPosts(locale);
    for (const post of posts) {
      entries.push({ url: `${SITE_URL}/${locale}/blog/${post.slug}` });
    }
  }

  return entries;
}
