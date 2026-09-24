import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { routing, type Locale } from "@/i18n/routing";

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
  return { title: post.title, description: post.summary };
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
    <Container className="py-16">
      <Link href="/blog" className="text-sm font-semibold text-accent">
        {t("backToBlog")}
      </Link>

      <p className="mt-4 text-xs text-muted-foreground">
        {post.date} · {t("minutesRead", { minutes: post.minutesRead })}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{post.title}</h1>

      <article
        className="markdown-body mt-8 max-w-2xl"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </Container>
  );
}
