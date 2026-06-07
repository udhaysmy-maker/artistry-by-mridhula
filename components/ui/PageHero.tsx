interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  center = true,
}: PageHeroProps) {
  return (
    <div
      className={`mx-auto max-w-6xl px-5 pb-10 pt-16 md:pt-20 ${center ? "text-center" : ""}`}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-serif text-5xl font-semibold leading-tight text-foreground md:text-6xl">
        {title}
      </h1>
      {subtitle && (
        <p
          className={`mt-4 text-lg text-muted-foreground ${center ? "mx-auto max-w-xl" : "max-w-xl"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
