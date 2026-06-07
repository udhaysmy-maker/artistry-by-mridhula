import Image from "next/image";

const previewImages = [
  { src: "/assets/gallery-1.jpg", alt: "Instagram post — bridal look" },
  { src: "/assets/gallery-2.jpg", alt: "Instagram post — reception makeup" },
  { src: "/assets/gallery-3.jpg", alt: "Instagram post — engagement look" },
  { src: "/assets/gallery-4.jpg", alt: "Instagram post — hairstyling" },
  { src: "/assets/gallery-5.jpg", alt: "Instagram post — saree draping" },
  { src: "/assets/gallery-6.jpg", alt: "Instagram post — photoshoot makeup" },
];

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function InstagramSection() {
  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Instagram
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-foreground">
            Follow the Journey
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Behind-the-scenes, bridal transformations, and daily inspiration —
            all on Instagram.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
          {previewImages.map((img, i) => (
            <a
              key={i}
              href="https://www.instagram.com/artistry_by_mridhula/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram post ${i + 1}`}
              className="group block overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                loading="lazy"
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 33vw, 16vw"
              />
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.instagram.com/artistry_by_mridhula/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <InstagramIcon />
            @artistry_by_mridhula
          </a>
        </div>
      </div>
    </section>
  );
}
