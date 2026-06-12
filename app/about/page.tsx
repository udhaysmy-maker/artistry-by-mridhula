import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "About Viji",
  description:
    "Meet Viji — a Professional bridal makeup artist in Chennai with 5+ years of experience crafting timeless looks for weddings, receptions, and special occasions.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Viji | Artistry by Mridhula",
    description:
      "Professional bridal makeup artist in Chennai with 5+ years of experience and 150+ happy brides.",
    url: "/about",
  },
};

const stats = [
  { value: "5+", label: "Years of experience" },
  { value: "150+", label: "Happy brides" },
  { value: "100+", label: "Weddings" },
  { value: "30+", label: "Editorial shoots" },
];

const whyChoose = [
  {
    title: "Certified & Trained",
    desc: "Trained in professional bridal makeup at Rajalakshmi Bridal Studio and further refined advanced techniques through exclusive workshops with renowned Chennai artist Jiya Makeup Artistry. Additional specialization includes men's grooming and makeover artistry through professional training with Men Makeover Artist.",
  },
  {
    title: "Premium Products Only",
    desc: "Every look is crafted using MAC, PAC, Estee Lauder, NARS, and other professional-grade products that are skin-safe, long-lasting, and camera-ready.",
  },
  {
    title: "Deeply Personal Approach",
    desc: "I spend time understanding your skin tone, facial structure, outfit, and vision — so every look is uniquely yours, not a template.",
  },
  {
    title: "On-Location Service",
    desc: "I come to you — whether it's a hotel, venue, or your home. No rushing, no stress. Just calm, focused artistry in your own space.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
      {/* Hero */}
      <PageHero
        eyebrow="About Me"
        title="The artist behind Artistry by Mridhula"
        subtitle="Five years of turning nerves into confidence and faces into art — one bride at a time."
      />

      {/* Portrait + Bio */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="overflow-hidden rounded-[2rem] shadow-xl">
            <Image
              src="/assets/about-2.png"
              alt="Viji — bridal makeup artist in her studio"
              width={1200}
              height={1400}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              My Story
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold leading-snug text-foreground">
              Hi, I&apos;m Viji — and I believe every bride deserves to feel
              extraordinary.
            </h2>
            <p className="mt-5 text-muted-foreground">
              I discovered my passion for makeup at sixteen, practising on my
              cousins and neighbours before anyone would let me near a bridal
              face. Five years later, I&apos;ve had the privilege of being a
              part of over 150 beautiful love stories across Chennai, Coimbatore,
              and beyond.
            </p>
            <p className="mt-4 text-muted-foreground">
              My philosophy is simple: great bridal makeup should enhance, not
              transform. You should look in the mirror and see the most luminous,
              most confident version of yourself — not a stranger. Every product
              I choose, every stroke I make, is guided by that principle.
            </p>
            <p className="mt-4 text-muted-foreground">
              Whether you envision a classic South Indian bridal look with bold
              eyes and rich lips, or a contemporary dewy finish that
              photographs like a dream, I&apos;ll bring that vision to life with
              care, skill, and a calm presence that makes your morning feel
              like a celebration, not a rush.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-secondary/50 p-4 text-center"
                >
                  <div className="font-serif text-3xl font-semibold text-primary">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Work With Me
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            My Philosophy
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-foreground">
            Makeup that moves with you
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Your wedding day is 12 hours of rituals, emotions, photography, and
            dancing. The makeup I create is designed to hold through all of it
            — through tears of joy, midday heat, flash photography, and the
            last song at midnight. But beyond staying power, I create looks
            that feel like you. Not heavy, not masked — just you, beautifully
            amplified.
          </p>
          <blockquote className="mx-auto mt-8 max-w-xl border-l-2 border-primary pl-6 text-left font-serif text-xl italic text-foreground">
            &ldquo;When a bride sees herself in the mirror and her eyes light up
            — that&apos;s the moment I work for.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Why Choose */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Why Choose Me
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-foreground">
            The Artistry by Mridhula difference
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {whyChoose.map((item, i) => (
            <div
              key={item.title}
              className="flex gap-5 rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary font-serif text-lg font-semibold text-primary">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 pb-20 text-center">
        <h2 className="font-serif text-4xl font-semibold text-foreground">
          Ready to begin your bridal journey?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Dates fill up quickly, especially during wedding season. Reach out
          early to check availability and secure your date.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book a Consultation
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-border px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Explore Services
          </Link>
        </div>
      </section>
    </div>
  );
}
