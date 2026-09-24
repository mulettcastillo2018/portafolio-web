import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import readingTime from "reading-time";
import type { Locale } from "@/i18n/routing";
import type { BlogPost, Project } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
const BLOG_DIR = path.join(CONTENT_DIR, "blog");

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

function readMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
}

export async function getAllProjects(): Promise<Project[]> {
  const files = readMarkdownFiles(PROJECTS_DIR);

  const projects = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const contentHtml = await markdownToHtml(content);

      return {
        slug,
        title: data.title ?? slug,
        summary: data.summary ?? "",
        stack: data.stack ?? [],
        role: data.role ?? "",
        year: data.year ?? new Date().getFullYear(),
        featured: Boolean(data.featured),
        order: data.order ?? 0,
        links: {
          demo: data.links?.demo,
          repo: data.links?.repo,
        },
        image: data.image,
        contentHtml,
      } satisfies Project;
    })
  );

  return projects.sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getAllPosts(locale: Locale): Promise<BlogPost[]> {
  const dir = path.join(BLOG_DIR, locale);
  const files = readMarkdownFiles(dir);

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const contentHtml = await markdownToHtml(content);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        summary: data.summary ?? "",
        tags: data.tags ?? [],
        minutesRead: Math.max(1, Math.round(stats.minutes)),
        contentHtml,
      } satisfies BlogPost;
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(
  locale: Locale,
  slug: string
): Promise<BlogPost | null> {
  const posts = await getAllPosts(locale);
  return posts.find((post) => post.slug === slug) ?? null;
}
