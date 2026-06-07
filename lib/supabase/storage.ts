import { createSupabaseServerClient } from "./server";

export const STORAGE_BUCKETS = {
  gallery: "gallery",
  blogImages: "blog-images",
} as const;

export type StorageBucket =
  (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];

export function getPublicUrl(bucket: StorageBucket, path: string): string {
  const supabase = createSupabaseServerClient();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadFile(
  bucket: StorageBucket,
  path: string,
  file: File,
  options?: { upsert?: boolean },
): Promise<{ path: string; publicUrl: string }> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: options?.upsert ?? false,
    });

  if (error) throw new Error(error.message);

  const publicUrl = getPublicUrl(bucket, data.path);
  return { path: data.path, publicUrl };
}

export async function deleteFile(
  bucket: StorageBucket,
  path: string,
): Promise<void> {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw new Error(error.message);
}

export function buildStoragePath(
  prefix: string,
  filename: string,
): string {
  const ext = filename.split(".").pop() ?? "jpg";
  const timestamp = Date.now();
  const safe = filename
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .slice(0, 40);
  return `${prefix}/${timestamp}-${safe}.${ext}`;
}
