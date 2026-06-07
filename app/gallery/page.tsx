import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid, type GalleryItem } from "@/components/gallery/GalleryGrid";
import { getGalleryItems } from "@/lib/gallery";
import type { GalleryCategory } from "@/components/gallery/GalleryFilter";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Portfolio Gallery",
  description:
    "Browse Mridhula's portfolio — bridal, reception, engagement, hairstyling, saree draping, and photoshoot makeup looks in Chennai.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Portfolio Gallery | Artistry by Mridhula",
    description:
      "Bridal, reception, engagement and photoshoot makeup looks by Mridhula — Chennai's luxury bridal makeup artist.",
    url: "/gallery",
  },
};

const VALID_CATEGORIES = new Set<string>([
  "Bridal",
  "Reception",
  "Engagement",
  "Hairstyle",
  "Saree Draping",
  "Photoshoot",
]);

const FALLBACK: GalleryItem[] = [
  { src: "/assets/gallery-1.jpg", alt: "South Indian bridal makeup — rich gold and crimson look", category: "Bridal" },
  { src: "/assets/gallery-2.jpg", alt: "Reception makeup — dramatic smoky eye with nude lip", category: "Reception" },
  { src: "/assets/gallery-3.jpg", alt: "Engagement look — dewy glass skin with rose petal lip", category: "Engagement" },
  { src: "/assets/gallery-4.jpg", alt: "Bridal updo with fresh jasmine flowers and gold pins", category: "Hairstyle" },
  { src: "/assets/gallery-5.jpg", alt: "Kanjivaram saree — Madisar draping style", category: "Saree Draping" },
  { src: "/assets/gallery-6.jpg", alt: "Editorial photoshoot — bold graphic liner with bare skin", category: "Photoshoot" },
];

export default function GalleryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Portfolio"
        title="Gallery"
        subtitle="A curated selection of bridal, reception, engagement, and editorial looks."
      />
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <Suspense fallback={<GallerySkeleton />}>
          <GalleryContent />
        </Suspense>
      </section>
    </div>
  );
}

async function GalleryContent() {
  let items: GalleryItem[] = FALLBACK;

  try {
    const rows = await getGalleryItems();
    if (rows.length > 0) {
      items = rows.map((row) => ({
        src: row.image_url,
        alt: row.title,
        category: (VALID_CATEGORIES.has(row.category ?? "")
          ? row.category
          : "Bridal") as Exclude<GalleryCategory, "All">,
      }));
    }
  } catch {
    // Supabase not configured — serve fallback placeholder images
  }

  return <GalleryGrid items={items} />;
}

function GallerySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-8 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-24 rounded-full bg-secondary" />
        ))}
      </div>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-secondary"
            style={{ height: i % 3 === 0 ? "280px" : i % 3 === 1 ? "220px" : "320px" }}
          />
        ))}
      </div>
    </div>
  );
}
