import Link from "next/link";

export interface ServiceCardProps {
  title: string;
  description: string;
  benefits: string[];
  process: string[];
}

export function ServiceCard({
  title,
  description,
  benefits,
  process,
}: ServiceCardProps) {
  return (
    <article className="flex flex-col rounded-3xl border border-border bg-card">
      <div className="border-b border-border px-8 py-6">
        <h2 className="font-serif text-2xl font-semibold text-foreground">
          {title}
        </h2>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-8">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
            What&apos;s Included
          </h3>
          <ul className="space-y-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">
            The Process
          </h3>
          <ol className="space-y-2">
            {process.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <Link
          href="/contact"
          className="mt-auto inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Book Consultation
        </Link>
      </div>
    </article>
  );
}
