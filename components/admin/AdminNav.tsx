"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  function close() {
    setMobileOpen(false);
  }

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-card px-4 lg:hidden">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => setMobileOpen(true)}
          className="rounded-md p-1.5 text-foreground hover:bg-secondary"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect y="3" width="20" height="2" rx="1" />
            <rect y="9" width="20" height="2" rx="1" />
            <rect y="15" width="20" height="2" rx="1" />
          </svg>
        </button>
        <Link href="/" className="font-serif text-base font-semibold text-foreground">
          Artistry<span className="text-primary"> by Mridhula</span>
        </Link>
      </header>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "flex flex-col border-r border-border bg-card",
          // Mobile: fixed overlay that slides in/out
          "fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible, in-flow, no animation
          "lg:relative lg:inset-auto lg:z-auto lg:w-56 lg:shrink-0 lg:translate-x-0 lg:transition-none",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <Link href="/" className="font-serif text-lg font-semibold text-foreground">
              Artistry<span className="text-primary"> by Mridhula</span>
            </Link>
            <p className="mt-0.5 text-xs text-muted-foreground">Admin</p>
          </div>
          {/* Close button — mobile only */}
          <button
            type="button"
            aria-label="Close navigation"
            onClick={close}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary lg:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.293 2.293a1 1 0 0 1 1.414 0L8 6.586l4.293-4.293a1 1 0 1 1 1.414 1.414L9.414 8l4.293 4.293a1 1 0 0 1-1.414 1.414L8 9.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L6.586 8 2.293 3.707a1 1 0 0 1 0-1.414z" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navLinks.map(({ href, label, exact }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={close}
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
            onClick={close}
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
    </>
  );
}
