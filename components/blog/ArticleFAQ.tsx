import type { FAQ } from "@/lib/blog/renderContent";

const DEFAULT_FAQS: FAQ[] = [
  {
    q: "How far in advance should I book bridal makeup?",
    a: "For peak wedding season (November–February), book 4–6 months ahead. Off-season, 2–3 months is usually fine. Popular dates fill very fast — the earlier the better.",
  },
  {
    q: "Is a bridal makeup trial included?",
    a: "Yes. Every bridal package includes a complimentary trial session, typically 1–2 weeks before the wedding, so we can perfect your look together before the big day.",
  },
  {
    q: "What makeup brands do you use?",
    a: "I work exclusively with professional-grade brands — MAC, NARS, Kryolan, Charlotte Tilbury, and Huda Beauty — all optimised for HD photography and long-lasting wear.",
  },
  {
    q: "How long does bridal makeup take on the wedding morning?",
    a: "Full bridal makeup takes 2–3 hours. If hairstyling and saree draping are included, allow an extra 1–1.5 hours. I always build in buffer time for final photos and touch-up guidance.",
  },
  {
    q: "Do you travel to the venue?",
    a: "Yes — on-location service is standard across all packages. I come to your home, hotel, or venue across Chennai. Outstation events are available with prior arrangement.",
  },
];

interface ArticleFAQProps {
  faqs?: FAQ[];
}

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

export function ArticleFAQ({ faqs }: ArticleFAQProps) {
  const items = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section className="mt-14" aria-labelledby="article-faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Section header */}
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">FAQ</p>
        <h2
          id="article-faq-heading"
          className="mt-1 font-serif text-2xl font-semibold text-foreground md:text-3xl"
        >
          Frequently Asked Questions
        </h2>
      </div>

      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        {items.map(({ q, a }) => (
          <details key={q} className="group px-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium text-foreground marker:hidden [&::-webkit-details-marker]:hidden">
              {q}
              <ChevronDown />
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
