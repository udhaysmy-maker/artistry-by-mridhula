import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "Artistry by Mridhula participates in affiliate marketing programmes including Amazon Associates. Learn how affiliate links work and our commitment to honest recommendations.",
  alternates: { canonical: "/affiliate-disclosure" },
  openGraph: {
    title: "Affiliate Disclosure | Artistry by Mridhula",
    description:
      "Our affiliate marketing disclosure — how commissions work and why we only recommend products we trust.",
    url: "/affiliate-disclosure",
  },
};

const LAST_UPDATED = "11 June 2026";
const CONTACT_EMAIL = "viji.udaya@gmail.com";

const sections = [
  {
    id: "disclosure-statement",
    title: "Disclosure Statement",
    highlight: true,
    content: [
      "Artistry by Mridhula participates in affiliate marketing programmes, including the Amazon Associates Programme. We may earn commissions from qualifying purchases made through affiliate links at no additional cost to you.",
      "In accordance with the FTC (Federal Trade Commission) guidelines and applicable consumer protection regulations, we are required to disclose our affiliate relationships clearly and prominently. This page fulfils that requirement.",
    ],
  },
  {
    id: "amazon-associates",
    title: "Amazon Associates Programme Disclosure",
    content: [
      "Artistry by Mridhula is a participant in the Amazon Services LLC Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in and Amazon.com.",
      "As an Amazon Associate, we earn from qualifying purchases. This means that when you click a product link on our Website that leads to Amazon and subsequently make a purchase, we receive a small referral commission from Amazon. The price you pay remains exactly the same — you do not pay anything extra.",
    ],
    badge: "Amazon Associates",
  },
  {
    id: "how-affiliate-links-work",
    title: "How Affiliate Links Work",
    content: [
      "When you click a product link on our Website, your browser is sent to the retailer's website with a special tracking code embedded in the URL. If you complete a purchase within a defined window (typically 24 hours for Amazon), we receive a small referral fee.",
    ],
    list: [
      "Affiliate links are identified by tracking codes appended to the URL (e.g., containing 'tag=' or similar parameters).",
      "Clicking an affiliate link does not affect the price you pay in any way.",
      "You are never obligated to purchase anything after clicking a link.",
      "Your purchase data is handled by the respective retailer (e.g., Amazon) under their own privacy policy.",
      "We do not have access to your personal payment or shipping information from these transactions.",
    ],
  },
  {
    id: "recommendation-policy",
    title: "Our Recommendation Policy",
    content: [
      "We take our responsibility to you seriously. We only feature and recommend products that we genuinely believe are relevant, high quality, and useful for our audience — brides, bridesmaids, and beauty enthusiasts.",
      "Products featured on this Website may include those in the following categories:",
    ],
    list: [
      "Bridal and wedding makeup products",
      "Skincare and skin preparation treatments",
      "Haircare and hairstyling tools",
      "Makeup brushes, tools, and accessories",
      "Wedding preparation essentials",
      "Beauty supplements and wellness products",
    ],
    footer:
      "The existence of an affiliate relationship does not influence our editorial judgement. We would not recommend a product solely because it offers a commission.",
  },
  {
    id: "no-additional-cost",
    title: "No Additional Cost to You",
    content: [
      "We want to be absolutely clear: using our affiliate links does not cost you anything extra.",
      "The price you see on the retailer's website is the price you pay. Affiliate commissions are paid by the retailer from their own margin — not by adding anything to your purchase price.",
      "In fact, shopping through our links is a simple, cost-free way to support the free content we create on this Website, including blog posts, beauty guides, and skincare tips tailored to brides.",
    ],
  },
  {
    id: "transparency-commitment",
    title: "Our Transparency Commitment",
    content: [
      "Transparency is core to how we operate. Here is what that means in practice:",
    ],
    list: [
      "We clearly disclose affiliate relationships on pages and posts that contain affiliate links.",
      "We do not accept payment to write positive reviews. Our opinions are always honest.",
      "We test or thoroughly research products before recommending them where possible.",
      "We will never recommend something we believe is harmful or misleading to our audience.",
      "If our views on a product change, we update or remove our recommendations accordingly.",
    ],
    footer:
      "We believe that honesty builds trust, and trust is the foundation of everything we do — from the makeup chair to this Website.",
  },
  {
    id: "contact",
    title: "Questions or Concerns",
    content: [
      "If you have any questions about our affiliate relationships, how we select products, or anything on this page, we are happy to hear from you. Transparency matters to us, and we will always respond honestly.",
    ],
    contact: {
      email: CONTACT_EMAIL,
      links: [
        { href: "/contact", label: "Contact page" },
        { href: "/privacy-policy", label: "Privacy Policy" },
      ],
    },
  },
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-primary"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function AffiliateDisclosurePage() {
  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Affiliate Disclosure", href: "/affiliate-disclosure" },
        ]}
      />

      <PageHero
        eyebrow="Legal"
        title="Affiliate Disclosure"
        subtitle="Full transparency about how we earn commissions and why it never compromises our recommendations."
      />

      <div className="mx-auto max-w-3xl px-5 pb-20">
        {/* Last updated bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card px-6 py-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Last updated:</span>{" "}
            {LAST_UPDATED}
          </p>
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            FTC Compliant
          </span>
        </div>

        {/* Quick-read summary card */}
        <div className="mb-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            In Plain Language
          </p>
          <h2 className="mt-2 font-serif text-xl font-semibold text-foreground">
            The short version
          </h2>
          <div className="mt-4 space-y-2">
            {[
              "Some links on this site are affiliate links.",
              "If you click and buy, we may earn a small commission.",
              "You pay the exact same price — nothing extra.",
              "We only recommend products we genuinely believe in.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckIcon />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`heading-${section.id}`}
              className={`rounded-2xl border p-6 md:p-8 ${
                section.highlight
                  ? "border-primary/20 bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-4">
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
                {section.badge && (
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                    {section.badge}
                  </span>
                )}
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
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="mt-3 border-l-2 border-primary/40 pl-4 text-sm italic leading-relaxed text-muted-foreground">
                    {section.footer}
                  </p>
                )}

                {section.contact && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Email us at{" "}
                      <a
                        href={`mailto:${section.contact.email}`}
                        className="text-primary underline underline-offset-2 hover:text-primary/80"
                      >
                        {section.contact.email}
                      </a>
                      , or visit:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {section.contact.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
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
          <Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
          <span aria-hidden="true">·</span>
          <Link href="/blog" className="hover:text-primary">Blog</Link>
          <span aria-hidden="true">·</span>
          <Link href="/contact" className="hover:text-primary">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
