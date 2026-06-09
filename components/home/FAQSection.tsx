const faqs = [
  {
    q: "How far in advance should I book your bridal makeup services?",
    a: "Bridal dates — especially during peak wedding season (November to February) — fill up 4 to 6 months in advance. I recommend reaching out as early as possible to check availability and secure your date. For off-season weddings, 2 to 3 months' notice is usually sufficient.",
  },
  {
    q: "Is a bridal makeup trial included?",
    a: "Yes. A complimentary trial session is included with every bridal makeup package. It usually takes place 1 to 2 weeks before the wedding, where we test products on your skin, refine the look together, and make sure everything is exactly right before the big day.",
  },
  {
    q: "What makeup brands do you use?",
    a: "I work exclusively with professional-grade brands including MAC, NARS, Kryolan, Charlotte Tilbury, and Huda Beauty. Every product is skin-safe, long-wearing, and optimised for both HD photography and natural light — so you look just as beautiful in person as you do in photos.",
  },
  {
    q: "How long does bridal makeup take on the morning of the wedding?",
    a: "Full bridal makeup typically takes 2 to 3 hours, including skin preparation, base application, and the complete look. If hairstyling and saree draping are included, allow an additional 1 to 1.5 hours. I always build in time at the end for final photos and touch-up guidance before I leave.",
  },
  {
    q: "Do you travel to my home or venue?",
    a: "Yes — on-location service is standard across all packages. I come to your home, hotel room, or venue so you can get ready in comfort, without rushing. Travel is available across Chennai and for outstation events with prior arrangement.",
  },
  {
    q: "Can you do makeup for bridesmaids and other family members too?",
    a: "Absolutely. I offer group bookings for bridesmaids, the mother of the bride, and other family members attending the ceremony. Group packages are available — just mention your bridal party size when you get in touch and I will put together a custom quote.",
  },
  {
    q: "What is the difference between HD makeup and airbrush makeup?",
    a: "HD makeup is applied by hand using high-definition products that look flawless in close-up and flash photography. Airbrush makeup is applied with a fine-spray gun for an ultra-smooth, lightweight finish that is ideal for long events and hot weather. Both are available — I will recommend the best option based on your skin type, outfit, and event duration.",
  },
  {
    q: "How should I prepare my skin before the wedding?",
    a: "Start a consistent skincare routine at least 4 to 6 weeks before the wedding — cleanse, tone, moisturise, and apply SPF daily. Avoid introducing new products or treatments in the two weeks leading up to the event. Stay hydrated and get good sleep the night before. I will share personalised skin prep guidance during your trial session.",
  },
  {
    q: "Do you offer hairstyling and saree draping alongside makeup?",
    a: "Yes. Hairstyling and saree draping are available both as standalone services and as part of combined bridal packages. I specialise in South Indian bridal styles including Madisar, Koora Pudavai, Bridal Pattu Saree, traditional braids, and contemporary updos.",
  },
  {
    q: "How do I confirm my booking and what happens if I need to cancel?",
    a: "Bookings are confirmed with an advance deposit, after which you will receive a written confirmation with all your event details. If you need to cancel, please let me know at least 4 weeks before the event date. The deposit is non-refundable but can be credited toward a rescheduled date within 6 months.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: a,
    },
  })),
};

function ChevronDown() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 group-open:rotate-180"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function FAQSection() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          FAQ
        </p>
        <h2 className="mt-2 font-serif text-4xl font-semibold text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Everything you need to know before booking. Can&apos;t find your
          answer?{" "}
          <a href="/contact" className="text-primary hover:underline">
            Get in touch
          </a>{" "}
          and I&apos;ll get back to you within 24 hours.
        </p>
      </div>

      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group px-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm font-medium text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
              {q}
              <ChevronDown />
            </summary>
            <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
