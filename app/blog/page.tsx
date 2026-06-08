import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { BlogCard, BlogCardSkeleton } from "@/components/blog/BlogCard";
import { getPaginatedPosts } from "@/lib/blog";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Blog — Bridal Makeup Tips & Guides",
  description:
    "Expert bridal makeup tips, reception looks, saree draping guides, and beauty advice by Mridhula — Chennai's luxury bridal makeup artist.",
  openGraph: {
    title: "Blog — Artistry by Mridhula",
    description: "Expert bridal makeup tips and beauty guides.",
    url: "/blog",
  },
  alternates: { canonical: "/blog" },
};

const PER_PAGE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // searchParams is a fast in-memory read — no network call
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(String(pageParam ?? "1")));

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />
      <PageHero
        eyebrow="Blog"
        title="Beauty Tips & Guides"
        subtitle="Expert advice on bridal makeup, hairstyling, saree draping, and everything you need for your big day."
      />
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <Suspense fallback={<BlogGridSkeleton />}>
          <BlogContent page={currentPage} />
        </Suspense>
      </section>
    </div>
  );
}

async function BlogContent({ page }: { page: number }) {
  let posts = null;
  let total = 0;
  let fetchError = false;

  try {
    const result = await getPaginatedPosts(page, PER_PAGE);
    posts = result.posts;
    total = result.total;
  } catch {
    fetchError = true;
  }

  const totalPages = Math.ceil(total / PER_PAGE);

  if (fetchError) {
    return (
      <p className="py-20 text-center text-muted-foreground">
        Unable to load posts right now. Please try again shortly.
      </p>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Coming Soon
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground">
          No posts yet
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
          Beauty tips, bridal guides, and inspiration are on their way. Check
          back soon!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <BlogCard key={post.id} post={post} priority={i < 3} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Blog pagination"
          className="mt-12 flex justify-center gap-2"
        >
          {page > 1 && (
            <Link
              href={`/blog?page=${page - 1}`}
              className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              &larr; Previous
            </Link>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/blog?page=${p}`}
              aria-current={p === page ? "page" : undefined}
              className={[
                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors",
                p === page
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-foreground hover:bg-secondary",
              ].join(" ")}
            >
              {p}
            </Link>
          ))}
          {page < totalPages && (
            <Link
              href={`/blog?page=${page + 1}`}
              className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Next &rarr;
            </Link>
          )}
        </nav>
      )}
    </>
  );
}

function BlogGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
