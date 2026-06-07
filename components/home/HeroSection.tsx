import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Bridal Makeup Artist · Chennai
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-[1.05] text-foreground md:text-6xl">
             Professional Bridal Makeup Artist in{" "}
            <em className="text-primary">Chennai</em>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Professional bridal makeup, hairstyling and saree draping for
            weddings, receptions and special occasions.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book Consultation
            </Link>
            <Link
              href="/gallery"
              className="rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src="/assets/hero-1.png"
              alt="Mridhula — luxury bridal makeup artist in Chennai"
              width={1280}
              height={1600}
              priority
              className="h-full w-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
