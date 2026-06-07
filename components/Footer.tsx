import Link from "next/link";
import { Mail } from "lucide-react";
import { getSettings } from "@/lib/settings";

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export async function Footer() {
  const s = await getSettings();
  const displayPhone = s.phone || null;
  const displayEmail = s.email || null;

  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Link
            href="/"
            className="font-serif text-2xl font-semibold text-foreground"
          >
            Artistry<span className="text-primary"> by Mridhula</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Timeless, glowing makeup artistry for life&apos;s most beautiful
            moments.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              ["/about", "About"],
              ["/services", "Services"],
              ["/gallery", "Gallery"],
              ["/products", "Products"],
              ["/blog", "Blog"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-primary">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
            Get in touch
          </h3>
          {displayEmail && (
            <p className="mt-4 text-sm text-muted-foreground">{displayEmail}</p>
          )}
          {displayPhone && (
            <p className="text-sm text-muted-foreground">{displayPhone}</p>
          )}
          <div className="mt-4 flex gap-4 text-muted-foreground">
            {s.instagram_url && (
              <a
                href={s.instagram_url}
                aria-label="Instagram"
                className="hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </a>
            )}
            {s.facebook_url && (
              <a
                href={s.facebook_url}
                aria-label="Facebook"
                className="hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </a>
            )}
            {displayEmail && (
              <a
                href={`mailto:${displayEmail}`}
                aria-label="Email"
                className="hover:text-primary"
              >
                <Mail size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {s.business_name}. All rights reserved.
      </div>
    </footer>
  );
}
