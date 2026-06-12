import Link from "next/link";

const services = [
  {
    title: "Bridal Makeup",
    desc: "Radiant, long-lasting bridal looks designed to make you feel luminous and confident on your wedding day.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: "Reception Makeup",
    desc: "Glamorous, camera-ready looks that keep you glowing from the ceremony to the last dance.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "Engagement Makeup",
    desc: "Soft, romantic looks that celebrate the beginning of your forever with effortless elegance.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    title: "Hairstyling",
    desc: "From traditional braids to modern updos, hair looks crafted to complement your bridal ensemble.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 7c0-2.21-3.58-4-8-4S4 4.79 4 7c0 1.66 1.47 3.11 3.67 3.73C7.25 11.94 7 13.13 7 14c0 2.76 2.24 5 5 5s5-2.24 5-5c0-.87-.25-2.06-.67-3.27C18.53 10.11 20 8.66 20 7z" />
      </svg>
    ),
  },
  {
    title: "Saree Draping",
    desc: "Bridal saree draping for Madisar, Pattu Saree, Koora Pudavai, Lehenga, and more.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22V12M12 12C12 12 7 9 7 4a5 5 0 0 1 10 0c0 5-5 8-5 8z" />
      </svg>
    ),
  },
  {
    title: "Photoshoot Makeup",
    desc: "Bold, camera-ready artistry crafted in collaboration with photographers for editorial perfection.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
];

export function ServicesPreview() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          What We Offer
        </p>
        <h2 className="mt-2 font-serif text-4xl font-semibold text-foreground">
          Services Tailored for You
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Every look is designed with care, precision, and a deep understanding
          of your personal style.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-border bg-card p-8 text-center transition-shadow hover:shadow-lg"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
              {s.icon}
            </div>
            <h3 className="mt-5 font-serif text-xl font-semibold text-foreground">
              {s.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Explore all services &rarr;
        </Link>
      </div>
    </section>
  );
}
