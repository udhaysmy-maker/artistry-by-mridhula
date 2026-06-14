const testimonials = [
  {
    name: "Priya Ramesh",
    event: "Bridal — December 2024",
    quote:
      "Viji made me feel like the most beautiful version of myself on my wedding day. My makeup stayed flawless through 12 hours of rituals, tears, and dancing. She truly understood my vision and brought it to life.",
    initials: "PR",
  },
  {
    name: "Ananya Krishnan",
    event: "Reception — February 2025",
    quote:
      "I was so nervous about my reception look but Viji put me completely at ease. She listened to every detail, offered amazing suggestions, and the result was absolutely stunning. I've never felt so confident.",
    initials: "AK",
  },
  {
    name: "Divya Subramaniam",
    event: "Engagement — October 2024",
    quote:
      "The saree draping alone was worth every rupee. Perfect, effortless, and held throughout the entire event. The makeup was glowy and fresh — exactly what I asked for. Highly recommend viji to every bride-to-be.",
    initials: "DS",
  },
];

function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="text-primary"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Client Love
        </p>
        <h2 className="mt-2 font-serif text-4xl font-semibold text-foreground">
          What My Brides Say
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Every bride deserves to feel radiant. Here&apos;s what some of mine
          had to say.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-8"
          >
            <div className="flex gap-0.5" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3 border-t border-border pt-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-primary">
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.event}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
