"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Lightbox } from "./Lightbox";
import {
  GalleryFilter,
  GALLERY_CATEGORIES,
  type GalleryCategory,
} from "./GalleryFilter";

export interface GalleryItem {
  src: string;           // thumbnail JPEG (fallback)
  srcWebp?: string;      // thumbnail WebP (preferred)
  originalSrc?: string;  // full-size JPEG (lightbox fallback)
  originalWebp?: string; // full-size WebP (lightbox preferred)
  alt: string;
  category: Exclude<GalleryCategory, "All">;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(
    () =>
      activeCategory === "All"
        ? items
        : items.filter((item) => item.category === activeCategory),
    [items, activeCategory],
  );

  const counts = useMemo(() => {
    const result = {} as Record<GalleryCategory, number>;
    for (const cat of GALLERY_CATEGORIES) {
      result[cat] = cat === "All" ? items.length : items.filter((i) => i.category === cat).length;
    }
    return result;
  }, [items]);

  function handleCategoryChange(cat: GalleryCategory) {
    setActiveCategory(cat);
    setLightboxIndex(null);
  }

  return (
    <div>
      <div className="mb-8">
        <GalleryFilter
          active={activeCategory}
          onChange={handleCategoryChange}
          counts={counts}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          No images in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((img, i) => (
            <button
              key={`${img.src}-${img.category}-${i}`}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl"
              aria-label={`View: ${img.alt}`}
            >
              <Image
                src={img.srcWebp ?? img.src}
                alt={img.alt}
                fill
                loading={i < 4 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </button>
          ))}
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={filteredItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
          onNext={() =>
            setLightboxIndex((i) =>
              Math.min(filteredItems.length - 1, (i ?? 0) + 1),
            )
          }
        />
      )}
    </div>
  );
}
