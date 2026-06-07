"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { createGalleryItem } from "@/app/admin/gallery/actions";

const CATEGORIES = ["bridal", "engagement", "party", "editorial", "other"];

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

export function GalleryUploadForm() {
  const [state, formAction, isPending] = useActionState(createGalleryItem, {
    error: null,
    success: false,
  });

  const [uploaderKey, setUploaderKey] = useState(0);
  const prevPending = useRef(false);
  useEffect(() => {
    if (prevPending.current && !isPending && state.success) {
      setUploaderKey((k) => k + 1);
    }
    prevPending.current = isPending;
  }, [isPending, state.success]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="gu-title" className={labelClass}>
            Title / Alt Text *
          </label>
          <input
            id="gu-title"
            name="title"
            required
            className={fieldClass}
            placeholder="Elegant Bridal Look — Anna & Raj"
          />
        </div>
        <div>
          <label htmlFor="gu-category" className={labelClass}>
            Category *
          </label>
          <select id="gu-category" name="category" required className={fieldClass}>
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="capitalize">
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ImageUploader key={uploaderKey} bucket="gallery" name="image_url" label="Image *" />

      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      {state.success && (
        <p role="status" className="text-sm text-emerald-600">
          Image added to gallery successfully.
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-primary px-7 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
      >
        {isPending ? "Uploading…" : "Add to Gallery"}
      </button>
    </form>
  );
}
