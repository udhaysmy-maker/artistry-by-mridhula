"use client";

import { useState } from "react";

const EVENT_TYPES = [
  { value: "bridal", label: "Bridal" },
  { value: "engagement", label: "Engagement" },
  { value: "reception", label: "Reception" },
  { value: "party", label: "Party / Festive" },
  { value: "sangeet", label: "Sangeet / Mehendi" },
  { value: "editorial", label: "Editorial / Photoshoot" },
  { value: "other", label: "Other" },
];

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      event_date: (form.elements.namedItem("event_date") as HTMLInputElement).value,
      event_type: (form.elements.namedItem("event_type") as HTMLSelectElement).value,
      location: (form.elements.namedItem("location") as HTMLInputElement).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Booking failed");
      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="font-serif text-2xl font-semibold text-primary">
          Booking Request Received!
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Thank you for reaching out. I&apos;ll confirm your booking within 24
          hours via WhatsApp or email.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-border px-6 py-2.5 text-sm font-semibold hover:bg-secondary"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-name" className={labelClass}>
            Full Name *
          </label>
          <input
            id="bk-name"
            name="name"
            required
            className={fieldClass}
            placeholder="Priya Sharma"
          />
        </div>
        <div>
          <label htmlFor="bk-phone" className={labelClass}>
            Phone / WhatsApp *
          </label>
          <input
            id="bk-phone"
            name="phone"
            type="tel"
            required
            className={fieldClass}
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-event-date" className={labelClass}>
            Event Date
          </label>
          <input
            id="bk-event-date"
            name="event_date"
            type="date"
            className={fieldClass}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          <label htmlFor="bk-event-type" className={labelClass}>
            Event Type
          </label>
          <select id="bk-event-type" name="event_type" className={fieldClass}>
            <option value="">Select event type</option>
            {EVENT_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="bk-location" className={labelClass}>
          Venue / Location
        </label>
        <input
          id="bk-location"
          name="location"
          className={fieldClass}
          placeholder="Wedding venue name or area, Chennai"
        />
      </div>

      <div>
        <label htmlFor="bk-notes" className={labelClass}>
          Additional Notes
        </label>
        <textarea
          id="bk-notes"
          name="notes"
          rows={4}
          className={`${fieldClass} resize-none`}
          placeholder="Tell me about your look preferences, any references you love, or anything else I should know."
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {status === "loading" ? "Sending…" : "Send Booking Request"}
      </button>
    </form>
  );
}
