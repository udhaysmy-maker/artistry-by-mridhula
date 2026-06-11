import { Suspense } from "react";
import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { getProducts, getProductCategories } from "@/lib/products";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Recommended Products",
  description:
    "Mridhula's handpicked makeup kits, foundations, brushes, and bridal accessories — products she trusts and recommends.",
  openGraph: {
    title: "Recommended Products — Artistry by Mridhula",
    description: "Handpicked beauty products trusted by Mridhula.",
    url: "/products",
  },
  alternates: { canonical: "/products" },
};

const FALLBACK_CATEGORIES = [
  "Makeup Kits",
  "Foundations",
  "Brushes",
  "Hair Accessories",
  "Saree Accessories",
  "Bridal Essentials",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Recommended Products — Artistry by Mridhula",
  description:
    "Handpicked makeup kits, foundations, brushes and bridal essentials recommended by Mridhula.",
};

export default function ProductsPage() {
  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageHero
        eyebrow="Products"
        title="Viji's Recommendations"
        subtitle="Handpicked makeup kits, foundations, brushes, and bridal accessories — products I use, trust, and recommend."
      />

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsContent />
        </Suspense>
      </section>
    </div>
  );
}

async function ProductsContent() {
  let products = null;
  let categories: string[] = [];
  let fetchError = false;

  try {
    [products, categories] = await Promise.all([
      getProducts(),
      getProductCategories(),
    ]);
    if (categories.length === 0) categories = FALLBACK_CATEGORIES;
  } catch {
    fetchError = true;
  }

  if (fetchError) {
    return (
      <p className="py-20 text-center text-muted-foreground">
        Unable to load products right now. Please try again shortly.
      </p>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Coming Soon
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground">
          Recommendations coming soon
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-muted-foreground">
          I&apos;m curating my favourite products. Check back soon!
        </p>
      </div>
    );
  }

  return <ProductsGrid products={products} categories={categories} />;
}

function ProductsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-24 rounded-full bg-secondary" />
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="h-48 bg-secondary" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 rounded bg-secondary" />
              <div className="h-3 w-1/2 rounded bg-secondary/70" />
              <div className="mt-3 h-8 w-28 rounded-full bg-secondary" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
