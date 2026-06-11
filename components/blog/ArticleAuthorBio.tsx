import Image from "next/image";
import Link from "next/link";

const WHATSAPP_URL =
  "https://wa.me/919884988335?text=Hi%20Mridhula%2C%20I%20would%20like%20to%20book%20a%20bridal%20makeup%20consultation.";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  (process.env.NEXT_PUBLIC_INSTAID
    ? `https://www.instagram.com/${process.env.NEXT_PUBLIC_INSTAID.replace(/^@/, "")}/`
    : "https://www.instagram.com/");

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const STATS = [
  { value: "8+", label: "Years Experience" },
  { value: "500+", label: "Brides Served" },
  { value: "100%", label: "On-Location" },
];

export function ArticleAuthorBio() {
  return (
    <section
      className="mx-auto max-w-5xl px-5 py-14"
      aria-labelledby="author-bio-heading"
    >
      <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start">
          {/* Photo */}
          <div className="relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-full border-4 border-primary/20 md:mx-0 md:h-40 md:w-40">
            <Image
              src="/about-2.png"
              alt="Mridhula — Bridal Makeup Artist"
              fill
              className="object-cover object-top"
              sizes="160px"
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              About the Author
            </p>
            <h2
              id="author-bio-heading"
              className="mt-1 font-serif text-2xl font-semibold text-foreground"
            >
              Mridhula
            </h2>
            <p className="text-sm font-medium text-muted-foreground">
              Professional Bridal Makeup Artist · Chennai, Tamil Nadu
            </p>

            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              I&apos;m a professional bridal makeup artist based in Chennai,
              specialising in South Indian and contemporary bridal looks. With
              over 8 years of experience and 500+ brides served, I bring a
              blend of artistry, precision, and warmth to every chair. My work
              has been featured in leading wedding publications, and I work
              exclusively with skin-safe, high-performance brands.
            </p>

            {/* Stats */}
            <div className="mt-5 flex flex-wrap justify-center gap-6 md:justify-start">
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-serif text-2xl font-semibold text-primary">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>

            {/* Social + CTA */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-white transition-opacity hover:opacity-90"
              >
                <InstagramIcon />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-colors hover:bg-[#25D366]/20"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Read Full Bio
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
