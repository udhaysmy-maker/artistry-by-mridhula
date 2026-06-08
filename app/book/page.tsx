import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { BookingForm } from "@/components/booking/BookingForm";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Book Your Bridal Makeup",
  description:
    "Ready to book Artistry by Mridhula for your wedding or special event? Send a booking request and I'll confirm within 24 hours.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book Your Bridal Makeup | Artistry by Mridhula",
    description:
      "Send a booking request for your wedding or special event makeup. Artistry by Mridhula — Chennai's luxury bridal makeup artist.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ReserveAction",
  target: {
    "@type": "EntryPoint",
    urlTemplate:
      (process.env.NEXT_PUBLIC_SITE_URL ?? "https://artistrybymridhula.com") +
      "/book",
    actionPlatform: [
      "http://schema.org/DesktopWebPlatform",
      "http://schema.org/MobileWebPlatform",
    ],
  },
  result: {
    "@type": "Reservation",
    name: "Makeup Booking",
  },
};

export default function BookPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Book Consultation", href: "/book" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PageHero
        eyebrow="Enquire"
        title="Book Your Look"
        subtitle="Fill in the details below and I'll confirm your booking within 24 hours."
      />
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <BookingForm />
      </section>
    </>
  );
}
