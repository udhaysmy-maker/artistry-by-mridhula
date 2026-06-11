import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";

interface ArticleHeroProps {
  post: BlogPost;
  readingTime: number;
  category?: string;
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function ArticleHero({
  post,
  readingTime,
  category = "Bridal Beauty",
}: ArticleHeroProps) {
  return (
    <div className="relative min-h-[60vh] overflow-hidden bg-foreground md:min-h-[72vh]">
      {/* Background image */}
      {post.cover_image ? (
        <Image
          src={post.cover_image}
          alt={post.title}
          fill
          priority
          className="object-cover opacity-65"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-foreground/80 to-foreground" />
      )}

      {/* Multi-stop gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      {/* Decorative top gradient */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

      {/* Breadcrumb nav */}
      <div className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto max-w-5xl px-5 pt-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/60">
            <Link href="/" className="hover:text-white/90 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white/90 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-white/80 line-clamp-1 max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero content — bottom-anchored */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-5xl px-5 pb-10 md:pb-14">
          {/* Category pill */}
          <span className="inline-flex items-center rounded-full bg-primary/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
            {category}
          </span>

          {/* Title */}
          <h1 className="mt-4 max-w-4xl font-serif text-3xl font-semibold leading-[1.15] text-white md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-3 max-w-2xl text-sm text-white/75 md:text-base leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
            {/* Author */}
            <div className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-white/30 bg-secondary">
                <Image
                  src="/about-2.png"
                  alt="Mridhula"
                  fill
                  className="object-cover object-top"
                  sizes="36px"
                />
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-white text-sm">Mridhula</p>
                <p className="text-xs text-white/60">Bridal Makeup Artist</p>
              </div>
            </div>

            {/* Divider */}
            <span className="hidden text-white/30 sm:block">|</span>

            {/* Date */}
            <div className="flex items-center gap-1.5">
              <CalendarIcon />
              <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            </div>

            {/* Reading time */}
            <div className="flex items-center gap-1.5">
              <ClockIcon />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
