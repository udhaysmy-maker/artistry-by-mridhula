"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

function SparklesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0 text-primary">
      <path d="M12 2l1.09 4.26L17 7l-3.91.74L12 12l-1.09-4.26L7 7l3.91-.74L12 2zM5.5 10l.63 2.47L8 13l-1.87.53L5.5 16l-.63-2.47L3 13l1.87-.53L5.5 10zM18.5 10l.63 2.47L21 13l-1.87.53L18.5 16l-.63-2.47L16 13l1.87-.53L18.5 10z" />
    </svg>
  );
}

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    // Replace with real email service integration
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    setEmail("");
  }

  return (
    <section
      className="bg-secondary/50 py-16"
      aria-labelledby="newsletter-heading"
    >
      <div className="mx-auto max-w-2xl px-5 text-center">
        <div className="flex items-center justify-center gap-2">
          <SparklesIcon />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Stay Inspired
          </p>
          <SparklesIcon />
        </div>

        <h2
          id="newsletter-heading"
          className="mt-2 font-serif text-2xl font-semibold text-foreground md:text-3xl"
        >
          Beauty Tips & Bridal Inspiration
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed">
          Join brides who get exclusive makeup tips, trend updates, and early
          booking offers straight to their inbox.
        </p>

        {status === "success" ? (
          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5">
            <p className="font-semibold text-emerald-700">You&apos;re in! 🌸</p>
            <p className="mt-1 text-sm text-emerald-600">
              Welcome to the community. Watch your inbox for beauty inspiration.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md gap-2"
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              disabled={status === "loading"}
              className="flex-1 rounded-full border border-border bg-card px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading" || !email.trim()}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {status === "loading" ? "…" : "Subscribe"}
            </button>
          </form>
        )}

        <p className="mt-3 text-xs text-muted-foreground">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
