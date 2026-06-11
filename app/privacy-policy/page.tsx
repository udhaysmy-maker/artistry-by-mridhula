import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Artistry by Mridhula collects, uses, and protects your personal information when you visit our website or book our bridal makeup services.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Artistry by Mridhula",
    description:
      "How Artistry by Mridhula collects, uses, and protects your personal information.",
    url: "/privacy-policy",
  },
};

const LAST_UPDATED = "11 June 2026";
const CONTACT_EMAIL = "viji.udaya@gmail.com";
const SITE_URL = "https://www.artistrybymridhula.com";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: [
      `Welcome to Artistry by Mridhula ("we", "our", or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit ${SITE_URL} (the "Website") or engage our bridal makeup and beauty services.`,
      "Please read this policy carefully. If you disagree with its terms, please discontinue use of the Website. We reserve the right to make changes to this policy at any time, and we will notify you by updating the 'Last Updated' date.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: [
      "We may collect the following types of information:",
    ],
    list: [
      "Personal identification information — name, email address, phone number, and wedding date, provided voluntarily when you submit a booking enquiry, contact form, or newsletter sign-up.",
      "Usage data — pages visited, time spent, referring URL, browser type, and device information, collected automatically via analytics tools.",
      "Communications — any messages, questions, or feedback you send to us directly via email or contact forms.",
      "Booking details — event type, venue, date, and service preferences you provide during the consultation or booking process.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    content: [
      "We use the information we collect for the following purposes:",
    ],
    list: [
      "To respond to your enquiries, process bookings, and provide our makeup services.",
      "To send booking confirmations, appointment reminders, and service-related communications.",
      "To send marketing communications and newsletters, only where you have opted in.",
      "To improve the Website, understand how visitors use it, and optimise content.",
      "To comply with applicable legal obligations.",
      "To protect our legitimate business interests, including fraud prevention.",
    ],
  },
  {
    id: "cookies-analytics",
    title: "Cookies & Analytics",
    content: [
      "We use cookies and similar tracking technologies to enhance your browsing experience and analyse Website traffic.",
      "Google Analytics is used to collect anonymised usage data, including page views, session duration, and geographic location. This data helps us understand how visitors interact with our Website. Google Analytics data is processed in accordance with Google's Privacy Policy.",
      "You may disable cookies through your browser settings at any time. Note that disabling certain cookies may affect the functionality of the Website.",
    ],
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    content: [
      "Our Website may contain links to third-party websites, including social media platforms (Instagram, Facebook), booking or payment processors, and affiliate partner sites. We are not responsible for the privacy practices of these third parties.",
      "We use the following third-party services, each subject to their own privacy policies:",
    ],
    list: [
      "Google Analytics — website traffic analysis",
      "Supabase — secure data storage and backend services",
      "Amazon Associates — affiliate marketing programme",
      "WhatsApp (Meta) — client communications",
      "Instagram / Facebook (Meta) — social media presence",
    ],
  },
  {
    id: "affiliate-links",
    title: "Affiliate Links & Commissions",
    content: [
      "Some pages on this Website contain affiliate links, including links to Amazon.in and Amazon.com products. When you click an affiliate link and make a purchase, we may earn a small commission at no additional cost to you.",
      "We only recommend products we genuinely believe are relevant and helpful for bridal beauty, skincare, makeup, and wedding preparation. Our editorial opinions are not influenced by affiliate relationships.",
      "For full details, please see our Affiliate Disclosure page.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    content: [
      "We implement appropriate technical and organisational measures to protect your personal information from unauthorised access, alteration, disclosure, or destruction. These measures include secure HTTPS connections, encrypted data storage, and access controls.",
      "However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.",
    ],
  },
  {
    id: "user-rights",
    title: "Your Rights",
    content: [
      "Depending on your location, you may have the following rights regarding your personal data:",
    ],
    list: [
      "Right to access — request a copy of the personal data we hold about you.",
      "Right to rectification — request correction of inaccurate or incomplete data.",
      "Right to erasure — request deletion of your personal data, subject to legal obligations.",
      "Right to restrict processing — request that we limit how we use your data.",
      "Right to object — object to our processing of your data for direct marketing purposes.",
      "Right to data portability — receive your data in a structured, machine-readable format.",
    ],
    footer:
      "To exercise any of these rights, please contact us at the email address listed below.",
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the 'Last Updated' date at the top of this page.",
      "We encourage you to review this page periodically to stay informed about how we protect your information. Continued use of the Website after any changes constitutes acceptance of the updated policy.",
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please contact us:",
    ],
    contact: {
      business: "Artistry by Mridhula",
      email: CONTACT_EMAIL,
      website: SITE_URL,
    },
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />

      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information."
      />

      <div className="mx-auto max-w-3xl px-5 pb-20">
        {/* Last updated + intro badge */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card px-6 py-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Last updated:</span>{" "}
            {LAST_UPDATED}
          </p>
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Artistry by Mridhula
          </span>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`heading-${section.id}`}
              className="rounded-2xl border border-border bg-card p-6 md:p-8"
            >
              <div className="mb-4 flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary font-serif text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <h2
                  id={`heading-${section.id}`}
                  className="font-serif text-xl font-semibold text-foreground"
                >
                  {section.title}
                </h2>
              </div>

              <div className="space-y-3 pl-12">
                {section.content.map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                    {para}
                  </p>
                ))}

                {section.list && (
                  <ul className="mt-3 space-y-2">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {section.footer}
                  </p>
                )}

                {section.contact && (
                  <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-4 text-sm">
                    <p className="font-semibold text-foreground">{section.contact.business}</p>
                    <p className="mt-1 text-muted-foreground">
                      Email:{" "}
                      <a
                        href={`mailto:${section.contact.email}`}
                        className="text-primary underline underline-offset-2 hover:text-primary/80"
                      >
                        {section.contact.email}
                      </a>
                    </p>
                    <p className="mt-0.5 text-muted-foreground">
                      Website:{" "}
                      <a
                        href={section.contact.website}
                        className="text-primary underline underline-offset-2 hover:text-primary/80"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {section.contact.website}
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 border-t border-border pt-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span aria-hidden="true">·</span>
          <Link href="/affiliate-disclosure" className="hover:text-primary">Affiliate Disclosure</Link>
          <span aria-hidden="true">·</span>
          <Link href="/contact" className="hover:text-primary">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
