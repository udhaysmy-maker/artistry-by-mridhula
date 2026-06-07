"use client";

import { useActionState } from "react";
import { ImageUploader } from "./ImageUploader";
import type { BlogPost } from "@/lib/blog";

interface BlogFormProps {
  action: (
    prev: { error: string | null },
    formData: FormData,
  ) => Promise<{ error: string | null }>;
  post?: BlogPost;
}

function toDatetimeLocal(iso: string) {
  return iso ? iso.slice(0, 16) : "";
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

export function BlogForm({ action, post }: BlogFormProps) {
  const [state, formAction, isPending] = useActionState(action, {
    error: null,
  });

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div>
        <label htmlFor="bf-title" className={labelClass}>
          Title *
        </label>
        <input
          id="bf-title"
          name="title"
          required
          defaultValue={post?.title}
          className={fieldClass}
          placeholder="10 Bridal Makeup Tips for 2025"
        />
      </div>

      <div>
        <label htmlFor="bf-slug" className={labelClass}>
          Slug *
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            (lowercase, hyphens only)
          </span>
        </label>
        <input
          id="bf-slug"
          name="slug"
          required
          defaultValue={post?.slug}
          className={fieldClass}
          placeholder="10-bridal-makeup-tips-2025"
          onChange={(e) => {
            e.target.value = slugify(e.target.value);
          }}
        />
      </div>

      <div>
        <label htmlFor="bf-excerpt" className={labelClass}>
          Excerpt
        </label>
        <textarea
          id="bf-excerpt"
          name="excerpt"
          rows={2}
          defaultValue={post?.excerpt ?? ""}
          className={`${fieldClass} resize-none`}
          placeholder="A short summary shown in blog listing (1–2 sentences)"
        />
      </div>

      <div>
        <label htmlFor="bf-content" className={labelClass}>
          Content *
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            Separate paragraphs with a blank line. Start a line with ## or ### for headings.
          </span>
        </label>
        <textarea
          id="bf-content"
          name="content"
          required
          rows={16}
          defaultValue={post?.content}
          className={`${fieldClass} resize-y font-mono text-xs`}
          placeholder="Write your blog post here..."
        />
      </div>

      <div>
        <label htmlFor="bf-date" className={labelClass}>
          Publish Date
        </label>
        <input
          id="bf-date"
          name="published_at"
          type="datetime-local"
          defaultValue={post ? toDatetimeLocal(post.published_at) : ""}
          className={fieldClass}
        />
      </div>

      <ImageUploader
        bucket="blog-images"
        name="cover_image"
        defaultUrl={post?.cover_image}
        label="Cover Image"
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
          {isPending ? "Saving…" : post ? "Update Post" : "Create Post"}
        </button>
        <a
          href="/admin/blogs"
          className="rounded-full border border-border px-7 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
