"use client";

import { useActionState } from "react";
import { ImageUploader } from "./ImageUploader";

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  affiliate_url: string | null;
  category: string | null;
}

interface ProductFormProps {
  action: (
    prev: { error: string | null },
    formData: FormData,
  ) => Promise<{ error: string | null }>;
  product?: Product;
}

const CATEGORIES = [
  "foundation",
  "lipstick",
  "eyeshadow",
  "blush",
  "skincare",
  "tools",
  "other",
];

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

export function ProductForm({ action, product }: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(action, {
    error: null,
  });

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div>
        <label htmlFor="pf-name" className={labelClass}>
          Product Name *
        </label>
        <input
          id="pf-name"
          name="name"
          required
          defaultValue={product?.name}
          className={fieldClass}
          placeholder="Charlotte Tilbury Pillow Talk Lipstick"
        />
      </div>

      <div>
        <label htmlFor="pf-category" className={labelClass}>
          Category
        </label>
        <select
          id="pf-category"
          name="category"
          defaultValue={product?.category ?? ""}
          className={fieldClass}
        >
          <option value="">Select category</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="capitalize">
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="pf-description" className={labelClass}>
          Description
        </label>
        <textarea
          id="pf-description"
          name="description"
          rows={3}
          defaultValue={product?.description ?? ""}
          className={`${fieldClass} resize-none`}
          placeholder="A brief description of the product and why you recommend it"
        />
      </div>

      <div>
        <label htmlFor="pf-affiliate" className={labelClass}>
          Affiliate URL *
        </label>
        <input
          id="pf-affiliate"
          name="affiliate_url"
          type="url"
          required
          defaultValue={product ? (product.affiliate_url ?? "") : ""}
          className={fieldClass}
          placeholder="https://amzn.to/..."
        />
      </div>

      <ImageUploader
        bucket="gallery"
        name="image_url"
        defaultUrl={product?.image_url ?? undefined}
        label="Product Image"
      />

      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-primary px-7 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
        >
          {isPending
            ? "Saving…"
            : product
              ? "Update Product"
              : "Add Product"}
        </button>
        <a
          href="/admin/products"
          className="rounded-full border border-border px-7 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
