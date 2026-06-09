"use client";

import { useState, useEffect } from "react";

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.32-1.32a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface Props {
  phone?: string;
  email?: string;
  instagramUrl?: string;
}

export function FloatingActions({ phone = "", email = "", instagramUrl = "" }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!phone && !email && !instagramUrl) return;
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [phone, email, instagramUrl]);

  if (!phone && !email && !instagramUrl) return null;

  const btn = (extra: string) =>
    [
      "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl",
      extra,
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
    ].join(" ");

  const rawPhone = phone.replace(/\D/g, "");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {instagramUrl && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow on Instagram"
          className={btn("bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]")}
        >
          <InstagramIcon />
        </a>
      )}

      {email && (
        <a
          href={`mailto:${email}?subject=Booking%20Enquiry%20%E2%80%94%20Artistry%20by%20Mridhula`}
          aria-label="Send us an email"
          className={btn("bg-zinc-700")}
        >
          <EmailIcon />
        </a>
      )}

      {phone && (
        <a
          href={`tel:${rawPhone}`}
          aria-label="Call us"
          className={btn("bg-primary")}
        >
          <PhoneIcon />
        </a>
      )}

      {phone && (
        <a
          href={`https://wa.me/${rawPhone}?text=Hi%20Viji%2C%20I%20would%20like%20to%20book%20a%20consultation.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className={btn("bg-[#25D366]")}
        >
          <WhatsAppIcon />
        </a>
      )}
    </div>
  );
}
