import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButtonServer } from "@/components/home/WhatsAppButtonServer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MetaPixel } from "@/components/analytics/MetaPixel";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://artistrybymridhula.com";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-karla",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  title: {
    default: "Artistry by Mridhula — Bridal Makeup Artist in Chennai",
    template: "%s | Artistry by Mridhula",
  },
  description:
    "Professional bridal makeup artist in Chennai. Timeless, glowing looks for weddings, engagements, and special occasions. Book Mridhula for your perfect bridal look.",
  keywords: [
    "bridal makeup artist Chennai",
    "wedding makeup Chennai",
    "South Indian bridal makeup",
    "Professional bridal makeup",
    "makeup artist Chennai",
    "Artistry by Mridhula",
  ],
  authors: [{ name: "Mridhula" }],
  creator: "Artistry by Mridhula",
  publisher: "Artistry by Mridhula",
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Artistry by Mridhula",
    title: "Artistry by Mridhula — Bridal Makeup Artist in Chennai",
    description:
      "Professional bridal makeup artist in Chennai. Timeless, glowing looks for weddings, engagements, and special occasions.",
    images: [
      {
        url: "/about-2.png",
        width: 1200,
        height: 630,
        alt: "Artistry by Mridhula — Bridal Makeup Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artistry by Mridhula — Bridal Makeup Artist in Chennai",
    description:
      "Professional bridal makeup artist in Chennai. Timeless, glowing looks for weddings, engagements, and special occasions.",
    images: ["/about-2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "BeautySalon"],
      "@id": `${BASE_URL}/#business`,
      name: "Artistry by Mridhula",
      description:
        "Professional bridal makeup artist in Chennai offering wedding makeup, engagement looks, and special occasion artistry.",
      url: BASE_URL,
      telephone: process.env.NEXT_PUBLIC_PHONE || "+91 9884988335",
      email: process.env.NEXT_PUBLIC_EMAIL ?? "",
      image: "https://www.artistrybymridhula.com/about-2.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 13.0827,
        longitude: 80.2707,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "09:00",
          closes: "20:00",
        },
      ],
      priceRange: "₹₹₹",
      sameAs: [
        process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
          (process.env.NEXT_PUBLIC_INSTAID
            ? `https://www.instagram.com/${process.env.NEXT_PUBLIC_INSTAID.replace(/^@/, "")}/`
            : undefined),
        process.env.NEXT_PUBLIC_FACEBOOK_URL,
      ].filter(Boolean),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${karla.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Suspense>
          <Footer />
        </Suspense>
        <Suspense>
          <WhatsAppButtonServer />
        </Suspense>
        <GoogleAnalytics />
        <MetaPixel />
      </body>
    </html>
  );
}
