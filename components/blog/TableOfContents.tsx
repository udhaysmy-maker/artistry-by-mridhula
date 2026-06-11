"use client";

import { useState, useEffect } from "react";
import type { Heading } from "@/lib/blog/renderContent";

interface TableOfContentsProps {
  headings: Heading[];
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible heading
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const tocList = (
    <ul className="space-y-1">
      {headings.map(({ id, text, level }) => (
        <li key={id}>
          <a
            href={`#${id}`}
            onClick={() => setMobileOpen(false)}
            className={[
              "block rounded-lg px-3 py-1.5 text-sm leading-snug transition-colors",
              level === 3 ? "pl-6" : "",
              activeId === id
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            ].join(" ")}
          >
            {text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* ── Mobile collapsible ── */}
      <div className="lg:hidden mb-6 rounded-2xl border border-border bg-card overflow-hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-sm font-semibold text-foreground"
          aria-expanded={mobileOpen}
        >
          <span className="flex items-center gap-2">
            <ListIcon />
            Table of Contents
          </span>
          <ChevronDown open={mobileOpen} />
        </button>
        {mobileOpen && (
          <div className="border-t border-border px-3 pb-3 pt-2">
            {tocList}
          </div>
        )}
      </div>

      {/* ── Desktop sticky card ── */}
      <div className="hidden lg:block">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <ListIcon />
            Table of Contents
          </h2>
          {tocList}
        </div>
      </div>
    </>
  );
}
