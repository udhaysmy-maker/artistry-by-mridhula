import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

export function BlogCard({ post, priority = false }: BlogCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        {(post.cover_thumbnail_url ?? post.cover_image) ? (
          <Image
            src={post.cover_thumbnail_url ?? post.cover_image!}
            alt={post.title}
            width={800}
            height={500}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="h-52 w-full object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-52 w-full items-center justify-center bg-secondary">
            <span className="font-serif text-2xl text-primary opacity-60">
              Artistry
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <time
          dateTime={post.published_at}
          className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
        >
          {formatDate(post.published_at)}
        </time>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-serif text-xl font-semibold text-foreground transition-colors hover:text-primary">
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto text-sm font-semibold text-primary hover:underline"
        >
          Read More &rarr;
        </Link>
      </div>
    </article>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="h-52 w-full animate-pulse bg-secondary" />
      <div className="flex flex-col gap-3 p-6">
        <div className="h-3 w-24 animate-pulse rounded-full bg-secondary" />
        <div className="h-5 w-full animate-pulse rounded bg-secondary" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-secondary" />
        <div className="h-3 w-full animate-pulse rounded bg-secondary" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-secondary" />
        <div className="mt-2 h-4 w-20 animate-pulse rounded bg-secondary" />
      </div>
    </div>
  );
}
