"use client";

export type GalleryCategory =
  | "All"
  | "Bridal"
  | "Reception"
  | "Engagement"
  | "Hairstyle"
  | "Saree Draping"
  | "Photoshoot";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All",
  "Bridal",
  "Reception",
  "Engagement",
  "Hairstyle",
  "Saree Draping",
  "Photoshoot",
];

interface GalleryFilterProps {
  active: GalleryCategory;
  onChange: (category: GalleryCategory) => void;
  counts: Record<GalleryCategory, number>;
}

export function GalleryFilter({ active, onChange, counts }: GalleryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="flex flex-wrap justify-center gap-2"
    >
      {GALLERY_CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          aria-pressed={active === cat}
          className={[
            "rounded-full px-5 py-2 text-sm font-medium transition-colors",
            active === cat
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-background text-foreground hover:bg-secondary",
          ].join(" ")}
        >
          {cat}
          <span
            className={[
              "ml-1.5 text-xs",
              active === cat ? "text-primary-foreground/70" : "text-muted-foreground",
            ].join(" ")}
          >
            ({counts[cat]})
          </span>
        </button>
      ))}
    </div>
  );
}
