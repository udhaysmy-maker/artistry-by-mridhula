import Image from "next/image";
import Link from "next/link";
import { getFeaturedGalleryItems } from "@/lib/gallery";

const FALLBACK = [
  { src: "/assets/gallery-1.jpg", alt: "Bridal makeup look — gold and blush tones" },
  { src: "/assets/gallery-3.jpg", alt: "Reception makeup — bold smoky eye" },
  { src: "/assets/gallery-6.jpg", alt: "Engagement look — fresh dewy skin" },
  { src: "/assets/gallery-2.jpg", alt: "Traditional South Indian bridal makeup" },
  { src: "/assets/gallery-4.jpg", alt: "Hairstyling — elegant updo with florals" },
  { src: "/assets/gallery-5.jpg", alt: "Photoshoot editorial makeup look" },
];

export async function PortfolioPreview() {
  let images: { src: string; alt: string }[] = FALLBACK;

  try {
    const rows = await getFeaturedGalleryItems(6);
    if (rows.length > 0) {
      images = rows.map((r) => ({ src: r.image_url, alt: r.title }));
    }
  } catch {
    // Supabase not configured — serve fallback placeholder images
  }

  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Portfolio
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-foreground">
            Recent Looks
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            A glimpse of artistry — from intimate ceremonies to grand
            celebrations.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <div key={i} className="group overflow-hidden rounded-2xl">
              <Image
                src={img.src}
                alt={img.alt}
                width={1024}
                height={1280}
                loading={i < 3 ? "eager" : "lazy"}
                className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="rounded-full border border-border bg-background px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            See Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
