"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

type UploadState =
  | { status: "idle" }
  | { status: "processing" }
  | {
      status: "done";
      originalWebpUrl: string;
      thumbnailWebpUrl: string;
      previewUrl: string;
    }
  | { status: "error"; message: string };

interface BlogCoverUploaderProps {
  defaultOriginalUrl?: string | null;
  defaultThumbnailUrl?: string | null;
}

export function BlogCoverUploader({
  defaultOriginalUrl,
  defaultThumbnailUrl,
}: BlogCoverUploaderProps) {
  const [upload, setUpload] = useState<UploadState>(
    defaultOriginalUrl
      ? {
          status: "done",
          originalWebpUrl: defaultOriginalUrl,
          thumbnailWebpUrl: defaultThumbnailUrl ?? defaultOriginalUrl,
          previewUrl: defaultOriginalUrl,
        }
      : { status: "idle" },
  );
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      const res = await fetch("/api/admin/blog-images", { method: "POST", body: fd });
      const json = (await res.json()) as {
        originalWebpUrl?: string;
        thumbnailWebpUrl?: string;
        error?: string;
      };
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setUpload({
        status: "done",
        originalWebpUrl: json.originalWebpUrl!,
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

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) void handleFile(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setDragging(false), []);

  function remove() {
    if (
      upload.status === "done" &&
      !upload.previewUrl.startsWith("https://") &&
      !upload.previewUrl.startsWith("http://")
    ) {
      URL.revokeObjectURL(upload.previewUrl);
    }
    setUpload({ status: "idle" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const labelCls =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <div>
      <p className={labelCls}>Cover Image</p>

      {upload.status === "done" ? (
        <div>
          <div className="relative h-40 w-full overflow-hidden rounded-xl border border-border">
            <Image
              src={upload.previewUrl}
              alt="Cover preview"
              fill
              className="object-cover"
              sizes="400px"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-2">
              <span className="rounded-full bg-emerald-500/90 px-2.5 py-0.5 text-xs font-medium text-white">
                ✓ WebP optimised
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={remove}
            className="mt-1.5 text-xs text-destructive hover:underline"
          >
            Remove &amp; replace
          </button>
          <input type="hidden" name="cover_image" value={upload.originalWebpUrl} />
          <input type="hidden" name="cover_thumbnail_url" value={upload.thumbnailWebpUrl} />
        </div>
      ) : (
        <>
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => upload.status !== "processing" && fileInputRef.current?.click()}
            className={[
              "flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-5 text-center transition-colors",
              dragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-secondary/30",
              upload.status === "processing" ? "pointer-events-none" : "",
            ].join(" ")}
          >
            {upload.status === "processing" ? (
              <>
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-xs text-muted-foreground">Processing to WebP…</p>
              </>
            ) : (
              <>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-muted-foreground"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <div>
                  <p className="text-xs font-medium text-foreground">
                    Drop cover image or{" "}
                    <span className="text-primary underline underline-offset-2">
                      click to upload
                    </span>
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    JPG, PNG or WebP · Max 15 MB · Converts to WebP
                  </p>
                </div>
              </>
            )}
          </div>
          {/* Empty hidden inputs so FormData always has these keys */}
          <input type="hidden" name="cover_image" value="" />
          <input type="hidden" name="cover_thumbnail_url" value="" />
        </>
      )}

      {upload.status === "error" && (
        <p className="mt-1.5 text-xs text-destructive">{upload.message}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
        }}
      />
    </div>
  );
}
