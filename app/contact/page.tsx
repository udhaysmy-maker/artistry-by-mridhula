import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description:
    "Book a bridal makeup consultation with Mridhula in Chennai. Reach out via the contact form or WhatsApp for availability and pricing.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Artistry by Mridhula",
    description:
      "Book a bridal makeup consultation in Chennai. Contact Mridhula via form or WhatsApp.",
    url: "/contact",
  },
};

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.32-1.32a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default async function ContactPage() {
  const s = await getSettings();
  const waPhone = (s.whatsapp || s.phone).replace(/\D/g, "");
  const waHref = waPhone
    ? `https://wa.me/${waPhone}?text=Hi%20Viji%2C%20I%20would%20like%20to%20book%20a%20consultation.`
    : null;

  const contactDetails = [
    s.phone && {
      icon: <PhoneIcon />,
      label: "Phone / WhatsApp",
      value: s.phone,
      href: `tel:${s.phone.replace(/\s/g, "")}`,
    },
    s.email && {
      icon: <MailIcon />,
      label: "Email",
      value: s.email,
      href: `mailto:${s.email}`,
    },
    s.address && {
      icon: <MapPinIcon />,
      label: "Location",
      value: `${s.address} · On-location available across South India`,
      href: null,
    },
  ].filter(Boolean) as Array<{
    icon: React.ReactNode;
    label: string;
    value: string;
    href: string | null;
  }>;

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title="Let's connect"
        subtitle="Tell me about your event and the look you have in mind — I'll get back to you within 24 hours."
      />

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left — contact info + social CTAs */}
          <div className="space-y-6">
            {contactDetails.map((d) => (
              <div key={d.label} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  {d.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {d.label}
                  </div>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      {d.value}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Social quick-links */}
            <div className="space-y-3 pt-2">
              {waHref && (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-3 rounded-2xl bg-[#25D366]/10 px-5 py-4 text-sm font-medium text-foreground transition-colors hover:bg-[#25D366]/20"
                >
                  <span className="text-[#25D366]">
                    <WhatsAppIcon />
                  </span>
                  <span>
                    <span className="block font-semibold">WhatsApp me directly</span>
                    <span className="text-muted-foreground">Fastest way to check availability</span>
                  </span>
                </a>
              )}

              {s.instagram_url && (
                <a
                  href={s.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-3 rounded-2xl bg-secondary px-5 py-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
                >
                  <span className="text-primary">
                    <InstagramIcon />
                  </span>
                  <span>
                    <span className="block font-semibold">Follow on Instagram</span>
                    <span className="text-muted-foreground">See my latest work</span>
                  </span>
                </a>
              )}
            </div>

            <div className="rounded-2xl bg-secondary/50 p-6 text-sm text-muted-foreground">
              <strong className="text-foreground">Booking note:</strong> Bridal
              dates for peak season (November–February) fill up 4–6 months in
              advance. Reach out early to secure your date and avoid
              disappointment.
            </div>
          </div>

          {/* Right — contact form */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
