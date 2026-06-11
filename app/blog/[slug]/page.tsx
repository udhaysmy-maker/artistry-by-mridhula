import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import {
  getPostBySlug,
  getPosts,
  getRelatedPosts,
  getAdjacentPosts,
  formatDate,
  type BlogPost,
} from "@/lib/blog";
import {
  renderContent,
  extractHeadings,
  estimateReadingTime,
  extractFAQs,
} from "@/lib/blog/renderContent";
import { BlogCard } from "@/components/blog/BlogCard";
import { ArticleHero } from "@/components/blog/ArticleHero";
import { ArticleAuthorCard } from "@/components/blog/ArticleAuthorCard";
import { ArticleAuthorBio } from "@/components/blog/ArticleAuthorBio";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { SocialShare } from "@/components/blog/SocialShare";
import { ArticleFAQ } from "@/components/blog/ArticleFAQ";
import { ConsultationCTA } from "@/components/blog/ConsultationCTA";
import { NewsletterSignup } from "@/components/blog/NewsletterSignup";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts = await getPosts();
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };
    return {
      title: post.title,
      description: post.excerpt ?? undefined,
      openGraph: {
        title: post.title,
        description: post.excerpt ?? undefined,
        url: `/blog/${slug}`,
        images: post.cover_image ? [{ url: post.cover_image, width: 1200, height: 630 }] : [],
        type: "article",
        publishedTime: post.published_at,
        authors: ["Mridhula"],
        tags: ["bridal makeup", "wedding beauty", "makeup tips"],
      },
      twitter: { card: "summary_large_image" },
      alternates: { canonical: `/blog/${slug}` },
    };
  } catch {
    return { title: "Blog" };
  }
}

// ── Prev / Next nav ───────────────────────────────────────────────────────────

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post = null;
  try {
    post = await getPostBySlug(slug);
  } catch {
    /* DB error — fall through to notFound */
  }
  if (!post) notFound();

  // Derive computed values
  const readingTime = estimateReadingTime(post.content);
  const headings = extractHeadings(post.content);
  const inlineFAQs = extractFAQs(post.content);
  const contentNodes = renderContent(post.content);

  // Related posts + adjacent posts — run concurrently, both non-fatal
  const [relatedResult, adjacentResult] = await Promise.allSettled([
    getRelatedPosts(post.slug, 3),
    getAdjacentPosts(post.published_at),
  ]);

  const relatedPosts: BlogPost[] =
    relatedResult.status === "fulfilled" ? relatedResult.value : [];
  const { prev = null, next = null } =
    adjacentResult.status === "fulfilled" ? adjacentResult.value : {};

  // JSON-LD — Article schema
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.cover_image ?? undefined,
    datePublished: post.published_at,
    dateModified: post.created_at,
    wordCount: post.content.trim().split(/\s+/).filter(Boolean).length,
    author: {
      "@type": "Person",
      name: "Mridhula",
      url: "https://artistrybymridhula.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Artistry by Mridhula",
      logo: {
        "@type": "ImageObject",
        url: "https://artistrybymridhula.com/favicon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://artistrybymridhula.com/blog/${post.slug}`,
    },
  };

  return (
    <article>
      {/* ── SEO ──────────────────────────────────────────────────────────── */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <ArticleHero post={post} readingTime={readingTime} />

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-5 py-10">
        {/* Two-column grid on desktop: content (left) + sidebar (right) */}
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12 xl:grid-cols-[1fr_320px]">

          {/* ── Main content column ─────────────────────────────────────── */}
          <div className="min-w-0">

            {/* Author card */}
            <ArticleAuthorCard post={post} />

            {/* Mobile TOC */}
            <div className="mt-6 lg:hidden">
              <TableOfContents headings={headings} />
            </div>

            {/* Article body */}
            <div className="mt-8">
              {contentNodes}
            </div>

            {/* Inline share — mobile only */}
            <div className="mt-10 border-t border-border pt-8 lg:hidden">
              <SocialShare title={post.title} slug={post.slug} />
            </div>

            {/* Share — desktop inline (below content) */}
            <div className="mt-10 hidden border-t border-border pt-8 lg:block">
              <SocialShare title={post.title} slug={post.slug} />
            </div>

            {/* FAQ */}
            <ArticleFAQ faqs={inlineFAQs.length > 0 ? inlineFAQs : undefined} />

            {/* Consultation CTA */}
            <ConsultationCTA />

            {/* Prev / Next navigation */}
            {(prev || next) && (
              <nav
                aria-label="Post navigation"
                className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
              >
                {prev && (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
                  >
                    <ChevronLeftIcon />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Previous</p>
                      <p className="mt-0.5 truncate font-serif font-semibold text-foreground group-hover:text-primary">
                        {prev.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{formatDate(prev.published_at)}</p>
                    </div>
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group flex items-start justify-end gap-3 rounded-2xl border border-border bg-card p-5 text-right transition-shadow hover:shadow-md sm:col-start-2"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Next</p>
                      <p className="mt-0.5 truncate font-serif font-semibold text-foreground group-hover:text-primary">
                        {next.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{formatDate(next.published_at)}</p>
                    </div>
                    <ChevronRightIcon />
                  </Link>
                )}
              </nav>
            )}
          </div>

          {/* ── Sidebar (desktop) ───────────────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              <TableOfContents headings={headings} />
              <SocialShare title={post.title} slug={post.slug} variant="vertical" />
            </div>
          </aside>
        </div>
      </div>

      {/* ── Related posts ─────────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="bg-secondary/40 py-16" aria-labelledby="related-posts-heading">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Keep Reading
              </p>
              <h2
                id="related-posts-heading"
                className="mt-1 font-serif text-2xl font-semibold text-foreground md:text-3xl"
              >
                You Might Also Like
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center rounded-full border border-border bg-card px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                View All Articles &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Author bio ────────────────────────────────────────────────────── */}
      <ArticleAuthorBio />

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <NewsletterSignup />
    </article>
  );
}
