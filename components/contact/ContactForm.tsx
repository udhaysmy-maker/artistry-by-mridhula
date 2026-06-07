"use client";

import { useState, useId } from "react";

const SERVICES = [
  "Bridal Makeup",
  "Reception Makeup",
  "Engagement Makeup",
  "Party Makeup",
  "Hairstyling",
  "Saree Draping",
  "Photoshoot Makeup",
  "Other",
];

interface FormState {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  service: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  eventDate: "",
  service: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";

const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const id = useId();

  function field(name: keyof FormState) {
    return {
      id: `${id}-${name}`,
      name,
      value: form[name],
      onChange: (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) => setForm((prev) => ({ ...prev, [name]: e.target.value })),
    };
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          eventDate: form.eventDate || undefined,
          service: form.service || undefined,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const json = (await res.json()) as { message?: string };
        throw new Error(json.message ?? "Submission failed");
      }
      setStatus("success");
      setForm(EMPTY_FORM);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-semibold text-foreground">
          Thank you!
        </h3>
        <p className="max-w-xs text-sm text-muted-foreground">
          Your message has been received. I&apos;ll get back to you within 24
          hours to confirm your booking.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-medium text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-border bg-card p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={labelClass}>
            Full Name <span aria-hidden="true" className="text-primary">*</span>
          </label>
          <input
            {...field("name")}
            id={`${id}-name`}
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Priya Ramesh"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={labelClass}>
            Phone Number <span aria-hidden="true" className="text-primary">*</span>
          </label>
          <input
            {...field("phone")}
            id={`${id}-phone`}
            type="tel"
            required
            maxLength={15}
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-email`} className={labelClass}>
          Email Address <span aria-hidden="true" className="text-primary">*</span>
        </label>
        <input
          {...field("email")}
          id={`${id}-email`}
          type="email"
          required
          maxLength={255}
          autoComplete="email"
          placeholder="priya@example.com"
          className={fieldClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-eventDate`} className={labelClass}>
            Event Date
          </label>
          <input
            {...field("eventDate")}
            id={`${id}-eventDate`}
            type="date"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${id}-service`} className={labelClass}>
            Service Required
          </label>
          <select
            {...field("service")}
            id={`${id}-service`}
            className={fieldClass}
          >
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className={labelClass}>
          Message <span aria-hidden="true" className="text-primary">*</span>
        </label>
        <textarea
          {...field("message")}
          id={`${id}-message`}
          required
          rows={5}
          maxLength={2000}
          placeholder="Tell me about your event, the look you have in mind, and any other details..."
          className={`${fieldClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-destructive">
          Something went wrong. Please try again or reach out on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
