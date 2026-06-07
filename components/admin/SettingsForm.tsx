"use client";

import { useActionState } from "react";
import { updateSettings } from "@/app/admin/settings/actions";
import type { SiteSettings } from "@/lib/settings";

interface Props {
  settings: SiteSettings;
}

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

const fields: Array<{
  key: keyof SiteSettings;
  label: string;
  type?: string;
  placeholder?: string;
}> = [
  { key: "business_name", label: "Business Name", placeholder: "Artistry by Mridhula" },
  { key: "owner_name", label: "Owner Name", placeholder: "Mridhula" },
  { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
  { key: "whatsapp", label: "WhatsApp Number", type: "tel", placeholder: "+91 98765 43210" },
  { key: "email", label: "Email Address", type: "email", placeholder: "hello@example.com" },
  { key: "address", label: "Address", placeholder: "Chennai, Tamil Nadu" },
  { key: "instagram_url", label: "Instagram URL", type: "url", placeholder: "https://instagram.com/..." },
  { key: "facebook_url", label: "Facebook URL", type: "url", placeholder: "https://facebook.com/..." },
  { key: "youtube_url", label: "YouTube URL", type: "url", placeholder: "https://youtube.com/..." },
];

export function SettingsForm({ settings }: Props) {
  const [state, formAction, isPending] = useActionState(updateSettings, {
    error: null,
    success: false,
  });

  return (
    <form action={formAction} className="space-y-5">
      {fields.map(({ key, label, type = "text", placeholder }) => (
        <div key={key}>
          <label htmlFor={`sf-${key}`} className={labelClass}>
            {label}
          </label>
          <input
            id={`sf-${key}`}
            name={key}
            type={type}
            defaultValue={settings[key]}
            className={fieldClass}
            placeholder={placeholder}
          />
        </div>
      ))}

      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-emerald-600" aria-live="polite">
          Settings saved successfully.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-primary px-7 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
      >
        {isPending ? "Saving…" : "Save Settings"}
      </button>
    </form>
  );
}
