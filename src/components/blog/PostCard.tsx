import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/types";

export function PostCard({ post }: { post: BlogPost }) {
  const t = useTranslations("blog");

  return (
    <Link href={`/blog/${post.slug}`} className="glass-card group revelar flex h-full flex-col rounded-3xl p-7 sm:p-8">
      <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <span>{post.date}</span>
        <span aria-hidden>·</span>
        <Clock size={13} aria-hidden />
        <span>{t("minutesRead", { minutes: post.minutesRead })}</span>
      </p>
      <h3 className="mt-4 text-xl leading-snug font-semibold tracking-tight text-balance">{post.title}</h3>
      <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">{post.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-accent">
        {t("readMore")}
        <ArrowRight size={16} className="transition-transform duration-300 ease-resorte group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
