import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import {
  getPostBySlug,
  getPosts,
  getAdjacentPosts,
  getRelatedPosts,
  formatDate,
} from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { SocialShare } from "@/components/blog/SocialShare";

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
        images: post.cover_image ? [{ url: post.cover_image }] : [],
        type: "article",
        publishedTime: post.published_at,
      },
      twitter: { card: "summary_large_image" },
      alternates: { canonical: `/blog/${slug}` },
    };
  } catch {
    return { title: "Blog" };
  }
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let buf: string[] = [];
  let key = 0;

  function flush() {
    const text = buf.join(" ").trim();
    if (text) {
      elements.push(
        <p key={key++} className="mt-4 leading-relaxed text-muted-foreground">
          {text}
        </p>,
      );
    }
    buf = [];
  }

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      elements.push(
        <h2 key={key++} className="mt-8 font-serif text-2xl font-semibold text-foreground">
          {line.slice(3)}
        </h2>,
      );
    } else if (line.startsWith("### ")) {
      flush();
      elements.push(
        <h3 key={key++} className="mt-6 font-serif text-xl font-semibold text-foreground">
          {line.slice(4)}
        </h3>,
      );
    } else if (line.trim() === "") {
      flush();
    } else {
      buf.push(line);
    }
  }
  flush();

  return elements;
}

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
    // DB error — show not found
  }

  if (!post) notFound();

  const [adjacent, related] = await Promise.allSettled([
    getAdjacentPosts(post.published_at),
    getRelatedPosts(post.slug, 3),
  ]);

  const { prev, next } =
    adjacent.status === "fulfilled"
      ? adjacent.value
      : { prev: null, next: null };

  const relatedPosts =
    related.status === "fulfilled" ? related.value : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.cover_image ?? undefined,
    datePublished: post.published_at,
    dateModified: post.created_at,
    author: {
      "@type": "Person",
      name: "Mridhula",
      url: "https://artistrybymridhula.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Artistry by Mridhula",
    },
  };

  return (
    <article>
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
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero image */}
      {post.cover_image && (
        <div className="relative h-80 w-full overflow-hidden md:h-[28rem]">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-foreground/40" />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-5 py-12">
        {/* Header */}
        <header className="mb-8">
          <Link
            href="/blog"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
          >
            &larr; All Posts
          </Link>
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {formatDate(post.published_at)}
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold leading-snug text-foreground md:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          )}
          <div className="mt-6 border-t border-border pt-6">
            <SocialShare title={post.title} slug={post.slug} />
          </div>
        </header>

        {/* Content */}
        <div className="prose-sm">{renderContent(post.content)}</div>

        {/* Bottom share */}
        <div className="mt-10 border-t border-border pt-8">
          <SocialShare title={post.title} slug={post.slug} />
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <nav
            aria-label="Post navigation"
            className="mt-10 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
          >
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="group rounded-2xl border border-border p-5 transition-shadow hover:shadow-md"
              >
                <p className="text-xs text-muted-foreground">&larr; Previous</p>
                <p className="mt-1 font-serif font-semibold text-foreground group-hover:text-primary">
                  {prev.title}
                </p>
              </Link>
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="group rounded-2xl border border-border p-5 text-right transition-shadow hover:shadow-md sm:col-start-2"
              >
                <p className="text-xs text-muted-foreground">Next &rarr;</p>
                <p className="mt-1 font-serif font-semibold text-foreground group-hover:text-primary">
                  {next.title}
                </p>
              </Link>
            )}
          </nav>
        )}
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="mb-8 font-serif text-3xl font-semibold text-foreground">
              You might also like
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
