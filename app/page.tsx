import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { CTASection } from "@/components/home/CTASection";

// Revalidate every hour so PortfolioPreview reflects new gallery uploads
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Artistry by Mridhula — Luxury Bridal Makeup Artist in Chennai",
  description:
    "Professional bridal makeup, hairstyling and saree draping for weddings, receptions and special occasions in Chennai. Book your consultation today.",
  openGraph: {
    title: "Artistry by Mridhula — Luxury Bridal Makeup Artist in Chennai",
    description:
      "Professional bridal makeup, hairstyling and saree draping for weddings, receptions and special occasions.",
    url: "/",
  },
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }]} />
      <HeroSection />
      <ServicesPreview />
      <PortfolioPreview />
      <TestimonialsSection />
      <FAQSection />
      <InstagramSection />
      <CTASection />
    </>
  );
}
