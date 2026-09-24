import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import type { BlogPost } from "@/lib/types";

export function PostCard({ post }: { post: BlogPost }) {
  const t = useTranslations("blog");

  return (
    <Card>
      <p className="text-xs text-muted-foreground">
        {post.date} · {t("minutesRead", { minutes: post.minutesRead })}
      </p>
      <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{post.summary}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-block text-sm font-semibold text-accent"
      >
        {t("readMore")} →
      </Link>
    </Card>
  );
}
