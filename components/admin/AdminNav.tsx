"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/blogs", label: "Blogs", exact: false },
  { href: "/admin/gallery", label: "Gallery", exact: false },
  { href: "/admin/products", label: "Products", exact: false },
  { href: "/admin/bookings", label: "Bookings", exact: false },
  { href: "/admin/messages", label: "Messages", exact: false },
  { href: "/admin/settings", label: "Settings", exact: false },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col border-r border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <Link href="/" className="font-serif text-lg font-semibold text-foreground">
          Artistry<span className="text-primary"> by Mridhula</span>
        </Link>
        <p className="mt-0.5 text-xs text-muted-foreground">Admin</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navLinks.map(({ href, label, exact }) => (
            <li key={href}>
              <Link
                href={href}
                className={[
                  "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(href, exact)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-secondary",
                ].join(" ")}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-border px-3 py-4">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 block rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-secondary"
        >
          View Site &rarr;
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-destructive/10"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
