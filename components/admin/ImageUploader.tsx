"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  bucket: "gallery" | "blog-images";
  name: string; // hidden input name
  defaultUrl?: string | null;
  label?: string;
}

export function ImageUploader({
  bucket,
  name,
  defaultUrl,
  label = "Image",
}: ImageUploaderProps) {
  const [url, setUrl] = useState<string>(defaultUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(`/api/admin/upload?bucket=${bucket}`, {
        method: "POST",
        body: fd,
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setUrl(json.url!);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>

      {/* Hidden input carries the URL into the form submission */}
      <input type="hidden" name={name} value={url} />

      {url && (
        <div className="relative h-40 w-full overflow-hidden rounded-xl border border-border">
          <Image src={url} alt="Preview" fill className="object-cover" sizes="400px" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-60"
        >
          {uploading ? "Uploading…" : url ? "Replace Image" : "Upload Image"}
        </button>
        {url && (
          <button
            type="button"
            onClick={() => setUrl("")}
            className="text-xs text-destructive hover:underline"
          >
            Remove
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={handleFile}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
