"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createGalleryItem } from "@/app/admin/gallery/actions";

const CATEGORIES = [
  "Wedding",
  "Engagement",
  "Reception",
  "Party",
  "Hairstyle",
  "Saree Draping",
  "Photoshoot",
  "Groom",
  "Bridesmaid",
  "Celebrity",
  "Baby Shower",
  "Puberty",
];

const fieldClass =
  "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";
const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

type UploadState =
  | { status: "idle" }
  | { status: "processing" }
  | {
      status: "done";
      originalUrl: string;
      originalWebpUrl: string;
      thumbnailUrl: string;
      thumbnailWebpUrl: string;
      previewUrl: string;
    }
  | { status: "error"; message: string };

export function GalleryUploadForm() {
  const [actionState, formAction, isPending] = useActionState(createGalleryItem, {
    error: null,
    success: false,
  });
  const [upload, setUpload] = useState<UploadState>({ status: "idle" });
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const prevPending = useRef(false);

  useEffect(() => {
    if (prevPending.current && !isPending && actionState.success) {
      setUpload({ status: "idle" });
      formRef.current?.reset();
    }
    prevPending.current = isPending;
  }, [isPending, actionState.success]);

  async function handleFile(file: File) {
    if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
      setUpload({ status: "error", message: "Only JPEG, PNG, or WebP images allowed." });
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setUpload({ status: "error", message: "File exceeds 15 MB limit." });
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setUpload({ status: "processing" });
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/gallery", { method: "POST", body: fd });
      if (!res.ok) {
        let message = "Upload failed. Please try again.";
        try {
          const json = (await res.json()) as { error?: string };
          if (json.error) message = json.error;
        } catch {
          // Server returned non-JSON (e.g. HTML 500 page) — keep default message
        }
        throw new Error(message);
      }
      const json = (await res.json()) as {
        originalUrl?: string;
        originalWebpUrl?: string;
        thumbnailUrl?: string;
        thumbnailWebpUrl?: string;
      };
      setUpload({
        status: "done",
        originalUrl:     json.originalUrl!,
        originalWebpUrl: json.originalWebpUrl!,
        thumbnailUrl:    json.thumbnailUrl!,
        thumbnailWebpUrl: json.thumbnailWebpUrl!,
        previewUrl,
      });
    } catch (e) {
      URL.revokeObjectURL(previewUrl);
      setUpload({
        status: "error",
        message: e instanceof Error ? e.message : "Upload failed. Please try again.",
      });
    }
  }

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) void handleFile(file);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setDragging(false), []);

  function removeImage() {
    if (upload.status === "done") URL.revokeObjectURL(upload.previewUrl);
    setUpload({ status: "idle" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
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
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Drag-drop / preview zone */}
      <div>
        <p className={labelClass}>Image *</p>

        {upload.status === "done" ? (
          <div>
            <div className="relative h-52 w-full overflow-hidden rounded-xl border border-border">
              <Image src={upload.previewUrl} alt="Preview" fill className="object-cover" sizes="500px" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-3">
                <span className="rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-xs font-medium text-white">
                  ✓ Uploaded &amp; optimised
                </span>
              </div>
            </div>
            <button type="button" onClick={removeImage} className="mt-2 text-xs text-destructive hover:underline">
              Remove &amp; choose different image
            </button>
            <input type="hidden" name="original_url"      value={upload.originalUrl} />
            <input type="hidden" name="original_webp_url" value={upload.originalWebpUrl} />
            <input type="hidden" name="thumbnail_url"     value={upload.thumbnailUrl} />
            <input type="hidden" name="thumbnail_webp_url" value={upload.thumbnailWebpUrl} />
          </div>
        ) : (
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => upload.status !== "processing" && fileInputRef.current?.click()}
            className={[
              "flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 text-center transition-colors",
              dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-secondary/30",
              upload.status === "processing" ? "pointer-events-none" : "",
            ].join(" ")}
          >
            {upload.status === "processing" ? (
              <>
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Processing &amp; uploading…</p>
                <p className="text-xs text-muted-foreground">Generating thumbnail and optimising for web</p>
              </>
            ) : (
              <>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Drop image here or{" "}
                    <span className="text-primary underline underline-offset-2">click to upload</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">JPG, PNG or WebP · Max 15 MB</p>
                </div>
              </>
            )}
          </div>
        )}

        {upload.status === "error" && (
          <p className="mt-1.5 text-xs text-destructive">{upload.message}</p>
        )}

        <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); }} />
      </div>

      {actionState.error && (
        <p role="alert" className="text-sm text-destructive">{actionState.error}</p>
      )}
      {actionState.success && (
        <p role="status" className="text-sm text-emerald-600">Image added to gallery successfully.</p>
      )}

      <button
        type="submit"
        disabled={isPending || upload.status !== "done"}
        className="rounded-full bg-primary px-7 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
      >
        {isPending ? "Saving…" : "Add to Gallery"}
      </button>
    </form>
  );
}
