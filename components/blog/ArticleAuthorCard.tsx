import Image from "next/image";
import { formatDate } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";

export function ArticleAuthorCard({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-secondary">
        <Image
          src="/about-2.png"
          alt="Mridhula"
          fill
          className="object-cover object-top"
          sizes="48px"
        />
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-foreground text-sm">Mridhula</p>
        <p className="text-xs text-muted-foreground">Professional Bridal Makeup Artist · Chennai</p>
      </div>
      <time
        dateTime={post.published_at}
        className="ml-auto shrink-0 text-xs text-muted-foreground"
      >
        {formatDate(post.published_at)}
      </time>
    </div>
  );
}
