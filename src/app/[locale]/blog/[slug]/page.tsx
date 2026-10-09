import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { routing, type Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    const posts = await getAllPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale as Locale, slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    // cada idioma tiene su propio slug, así que solo se declara la URL canónica
    alternates: alternatesFor(locale as Locale, `/blog/${slug}`, { sameInAllLocales: false }),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const post = await getPostBySlug(locale as Locale, slug);

  if (!post) notFound();

  return (
    <Container ancho="angosto" className="pt-12 pb-24 sm:pt-16">
      <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
        <ArrowLeft size={16} className="transition-transform duration-300 ease-resorte group-hover:-translate-x-0.5" />
        {t("backToBlog")}
      </Link>
      <header className="mt-8 animate-aparecer border-b border-border pb-10">
        <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span>{post.date}</span>
          <span aria-hidden>·</span>
          <Clock size={13} aria-hidden />
          <span>{t("minutesRead", { minutes: post.minutesRead })}</span>
        </p>
        <h1 className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl">{post.title}</h1>
      </header>
      <article className="markdown-body mt-10" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </Container>
  );
}
