import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
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

const PROVIDER = {
  "@type": "BeautySalon" as const,
  name: "Artistry by Mridhula",
  url: "https://www.artistrybymridhula.com",
};

const AREA_SERVED = { "@type": "City" as const, name: "Chennai" };

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Bridal Makeup",
      description:
        "A complete bridal experience crafted for your most important day. From the pre-wedding trial to the ceremony itself, every detail is considered — from skin prep and base selection to the final setting spray.",
      provider: PROVIDER,
      areaServed: AREA_SERVED,
    },
    {
      "@type": "Service",
      name: "Reception Makeup",
      description:
        "Reception nights call for a bolder, more dramatic look that holds through the evening's celebrations. Designed to dazzle under event lighting and flash photography.",
      provider: PROVIDER,
      areaServed: AREA_SERVED,
    },
    {
      "@type": "Service",
      name: "Engagement Makeup",
      description:
        "Soft, romantic, and effortlessly radiant — engagement makeup is about glowing skin and timeless elegance. Photographs beautifully in natural light and is comfortable throughout the ceremony.",
      provider: PROVIDER,
      areaServed: AREA_SERVED,
    },
    {
      "@type": "Service",
      name: "Party Makeup",
      description:
        "Whether it's a sangeet, mehendi, family function, or birthday celebration, party makeup is all about fun, personality, and a little extra sparkle.",
      provider: PROVIDER,
      areaServed: AREA_SERVED,
    },
    {
      "@type": "Service",
      name: "Groom Makeup",
      description:
        "Look confident, fresh, and camera-ready on your special day. Designed to enhance natural features while maintaining a clean and masculine appearance.",
      provider: PROVIDER,
      areaServed: AREA_SERVED,
    },
    {
      "@type": "Service",
      name: "Bridesmaid Makeup",
      description:
        "Complement the bride's special day with a polished and elegant look. Ensures a cohesive appearance across the bridal party that photographs beautifully and lasts throughout the event.",
      provider: PROVIDER,
      areaServed: AREA_SERVED,
    },
    {
      "@type": "Service",
      name: "Bridal Hairstyling",
      description:
        "From traditional pleated braids adorned with jasmine to contemporary waterfall curls and sleek chignons. Every style is chosen to complement your face shape, outfit, and headwear.",
      provider: PROVIDER,
      areaServed: AREA_SERVED,
    },
    {
      "@type": "Service",
      name: "Saree Draping",
      description:
        "Traditional South Indian saree draping tailored to your wedding style, including Madisar, Bridal Pattu Saree, Koora Pudavai, Lehenga Drape, Can Can Drape, and Nattu Pura Saree.",
      provider: PROVIDER,
      areaServed: AREA_SERVED,
    },
    {
      "@type": "Service",
      name: "Photoshoot Makeup",
      description:
        "Camera-ready, concept-driven makeup created in collaboration with photographers and art directors. Focused on looks that translate beautifully through a lens — bold, clean, and intentional.",
      provider: PROVIDER,
      areaServed: AREA_SERVED,
    },
  ],
};

const services = [
  {
    title: "Bridal Makeup",
    price: "Starting from ₹15,000",
    description:
      "A complete bridal experience crafted for your most important day. From the pre-wedding trial to the ceremony itself, every detail is considered — from skin prep and base selection to the final setting spray. Expect a long-lasting, photograph-ready look that feels as beautiful in real life as it does through a lens.",
    benefits: [
      "Complimentary bridal makeup trial",
      "HD, Glossy & Airbrush makeup options",
      "Professional products from MAC, NARS & Charlotte Tilbury",
      "Premium lashes and contact lens assistance",
      "Customized hairstyling and expert saree draping",
      "Convenient on-location bridal services at your preferred venue",
    ],
    process: [
      "Consultation call to understand your vision, skin type, and outfit",
      "Trial session 1–2 weeks before — test products, refine the look",
      "Wedding morning arrival — skin prep, base, full look application",
      "Final check, photos, and touch-up guidance for the day",
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
      "Lens & Lashes included",
      "Suited for event and indoor lighting",
      "Personalized hairstyling",
      "On-location service available",
      
    ],
    process: [
      "Brief consultation on outfit, jewellery, and desired vibe",
      "Skin preparation and full base application",
      "Eye, cheek, and lip application with final setting",
      "Styling photos and touch-up guidance",
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
      "Nails & Lashes optional",
      "Comfortable for long ceremonies",
      "On-location service available",
      "Tailored Hairstyling and Saree Draping"
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
      "Lens & Lashes optional",
      "Hairstyling of your choice",
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
      "Hair preparation — blow-dry if needed",
      "Styling application with finishing products",
      "Accessory and flower placement",
    ],
  },
  {
    title: "Saree Draping",
    price: "Starting from ₹2,500",
    description:
      "Traditional South Indian saree draping tailored to your wedding style, including Madisar, Bridal Pattu Saree, Koora Pudavai, Lehenga Drape, Can Can Drape, Nattu Pura Saree, and Pre-Pleating. A perfectly draped saree elevates the entire look; it should be comfortable, structured, and hold through the day.",
    benefits: [
      "South Indian regional draping styles",
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
      "Personalized concept and look consultation",
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
  {
    title: "Groom Makeup",
    price: "Starting from ₹6,000",
    description:
      "Look confident, fresh, and camera-ready on your special day. Our groom makeup service is designed to enhance your natural features while maintaining a clean and masculine appearance. From skin preparation and grooming to hairstyling and touch-ups, every detail is carefully handled to ensure you look your absolute best throughout the celebrations.",
    benefits: [
      "Personalized skin preparation and grooming",
      "Natural HD makeup for a flawless, camera-ready look",
      "Professional hairstyling tailored to your preference",
      "Beard shaping and grooming assistance",
      "Premium products from MAC, NARS & Charlotte Tilbury",
      "On-location grooming services at your preferred venue",
    ],
    process: [
      "Consultation to understand your style, outfit, and event requirements",
      "Skin preparation, grooming, and beard detailing",
      "Hairstyling and natural makeup application",
      "Final touch-ups and grooming check before the event",
    ],
  },
  {
    title: "Bridesmaid Makeup",
    price: "Starting from ₹6,000",
    description:
      "Complement the bride's special day with a polished and elegant look. Our bridesmaid makeup service is designed to enhance your natural beauty while ensuring a cohesive appearance across the bridal party. Whether you prefer a soft, natural finish or a glamorous celebration look, we create styles that photograph beautifully and last throughout the event.",
    benefits: [
      "Personalized makeup consultation",
      "Soft glam, natural, or party makeup looks",
      "Professional hairstyling tailored to your outfit",
      "Premium products from MAC, NARS & Charlotte Tilbury",
      "Saree draping assistance available",
      "Lashes application available upon request",
      "On-location beauty services at your preferred venue",
    ],
    process: [
      "Consultation to understand outfit colors, theme, and preferences",
      "Skin preparation and makeup planning",
      "Makeup application and hairstyling",
      "Final touch-ups before the ceremony or photoshoot",
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
