import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Bridal makeup, reception, engagement, hairstyling, saree draping and photoshoot makeup services in Chennai by Artistry by Mridhula.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services & Pricing | Artistry by Mridhula",
    description:
      "Bridal makeup, reception, engagement, hairstyling, saree draping and photoshoot makeup services in Chennai.",
    url: "/services",
  },
};

const services = [
  {
    title: "Bridal Makeup",
    price: "Starting from ₹15,000",
    description:
      "A complete bridal experience crafted for your most important day. From the pre-wedding trial to the ceremony itself, every detail is considered — from skin prep and base selection to the final setting spray. Expect a long-lasting, photograph-ready look that feels as beautiful in real life as it does through a lens.",
    benefits: [
      "Pre-wedding trial session included",
      "HD & airbrush techniques available",
      "Premium products (MAC, Kryolan, NARS)",
      "Includes eye lashes application",
      "Touch-up kit provided for the day",
      "On-location service available",
    ],
    process: [
      "Consultation call to understand your vision, skin type, and outfit",
      "Trial session 1–2 weeks before — test products, refine the look",
      "Wedding morning arrival — skin prep, base, full look application",
      "Final check, photos, and touch-up kit handover",
    ],
  },
  {
    title: "Reception Makeup",
    price: "Starting from ₹10,000",
    description:
      "Reception nights call for a bolder, more dramatic look that holds through the evening's celebrations. Whether you want sultry smoky eyes, bold lips, or a glamorous shimmer finish, this look is designed to dazzle under event lighting and flash photography.",
    benefits: [
      "Dramatic, evening-appropriate look",
      "Long-wear formulas for all-night hold",
      "Lashes included",
      "Suited for event and indoor lighting",
      "On-location service available",
    ],
    process: [
      "Brief consultation on outfit, jewellery, and desired vibe",
      "Skin preparation and full base application",
      "Eye, cheek, and lip application with final setting",
      "Styling photos and touch-up product guidance",
    ],
  },
  {
    title: "Engagement Makeup",
    price: "Starting from ₹8,000",
    description:
      "Soft, romantic, and effortlessly radiant — engagement makeup is about glowing skin and timeless elegance. This look photographs beautifully in natural light and is designed to feel comfortable throughout the ceremony and ring exchange.",
    benefits: [
      "Soft glam or full glam options",
      "Dewy, luminous skin finish",
      "Lashes optional",
      "Comfortable for long ceremonies",
      "On-location service available",
    ],
    process: [
      "Quick consultation on outfit colour and setting",
      "Skin prep and hydrating base application",
      "Soft eye, blush, and lip application",
      "Final photos and setting spray",
    ],
  },
  {
    title: "Party Makeup",
    price: "Starting from ₹5,000",
    description:
      "Whether it's a sangeet, mehendi, family function, or birthday celebration, party makeup is all about fun, personality, and a little extra sparkle. Looks range from fresh and festive to full-on glam — whatever the occasion demands.",
    benefits: [
      "Festive and fun looks",
      "Quick application — 45 to 60 mins",
      "Wide range of styles",
      "Lashes optional",
    ],
    process: [
      "Quick brief on the occasion and outfit",
      "Base and look application",
      "Final review and setting",
    ],
  },
  {
    title: "Hairstyling",
    price: "Starting from ₹4,000",
    description:
      "From traditional pleated braids adorned with jasmine to contemporary waterfall curls and sleek chignons, hairstyling is offered as a standalone service or in combination with makeup. Every style is chosen to complement your face shape, outfit, and headwear.",
    benefits: [
      "All hair types — straight, wavy, curly",
      "Traditional and contemporary styles",
      "Flower, accessory, and jewellery placement",
      "Heat protection products used",
      "Standalone or as part of a package",
    ],
    process: [
      "Consultation on style preference and headwear",
      "Hair preparation — wash, blow-dry if needed",
      "Styling application with finishing products",
      "Accessory and flower placement",
    ],
  },
  {
    title: "Saree Draping",
    price: "Starting from ₹2,500",
    description:
      "Flawless saree draping in all regional styles — South Indian Madisar, Nivi, Gujarati, Maharashtrian Nauvari, Bengali, and more. A perfectly draped saree elevates the entire look; it should be comfortable, structured, and hold through the day.",
    benefits: [
      "All Indian regional draping styles",
      "Petticoat pinning and blouse adjustment included",
      "Pleat pressing if required",
      "Holds throughout the full event",
      "Standalone or combined with makeup/hair",
    ],
    process: [
      "Saree and blouse inspection and prep",
      "Petticoat pinning and alignment",
      "Pallu draping and pleat setting",
      "Final tuck, pin, and comfort check",
    ],
  },
  {
    title: "Photoshoot Makeup",
    price: "Starting from ₹6,000",
    description:
      "Camera-ready, concept-driven makeup created in collaboration with photographers and art directors. Whether it's a pre-wedding shoot, brand editorial, or portfolio project, this service focuses on looks that translate beautifully through a lens — bold, clean, and intentional.",
    benefits: [
      "HD and airbrush techniques",
      "Mood-board driven look planning",
      "Multiple looks available per session",
      "On-set touch-ups throughout shoot",
      "Collaboration with photography team",
    ],
    process: [
      "Mood-board and brief review with photographer",
      "Look planning — skin tone, lighting, concept",
      "Full look application per concept",
      "On-set adjustments between shots",
    ],
  },
];

export default async function ServicesPage() {
  const s = await getSettings();
  const waPhone = (s.whatsapp || s.phone).replace(/\D/g, "");
  const waHref = waPhone
    ? `https://wa.me/${waPhone}?text=Hi%20Mridhula%2C%20I%27d%20like%20to%20discuss%20a%20custom%20package.`
    : "https://wa.me/";
  return (
    <div>
      <PageHero
        eyebrow="Services"
        title="Artistry for every occasion"
        subtitle="Every service includes a personal consultation. Pricing may vary based on location, event duration, and group size."
      />

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>

      {/* Custom package CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-3xl bg-secondary/50 px-6 py-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Need Something Custom?
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground">
            Full bridal packages & group bookings
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Looking for a combined makeup, hair, and saree draping package? Or
            booking for an entire bridal party? I&apos;d love to design a
            custom package just for you.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Request a Quote
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
