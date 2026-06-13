"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/auth";

const CATEGORIES = [
  "Bridal",
  "Engagement",
  "Reception",
  "Party",
  "Hairstyle",
  "Saree Draping",
  "Photoshoot",
  "Groom",
  "Bridesmaid",
];

export async function createGalleryItem(
  _prev: { error: string | null; success: boolean },
  formData: FormData,
): Promise<{ error: string | null; success: boolean }> {
  await requireAdmin();

  const title            = (formData.get("title") as string)?.trim();
  const original_url     = (formData.get("original_url") as string)?.trim();
  const original_webp    = (formData.get("original_webp_url") as string)?.trim() || null;
  const thumbnail_url    = (formData.get("thumbnail_url") as string)?.trim() || null;
  const thumbnail_webp   = (formData.get("thumbnail_webp_url") as string)?.trim() || null;
  const category         = (formData.get("category") as string)?.trim();

  if (!title) return { error: "Title is required", success: false };
  if (!original_url) return { error: "Image is required — please upload a photo", success: false };
  if (!category || !CATEGORIES.includes(category))
    return { error: "Please select a valid category", success: false };

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("gallery_items").insert({
    title,
    image_url: original_url,
    original_webp_url: original_webp,
    thumbnail_url,
    thumbnail_webp_url: thumbnail_webp,
    category,
  });

  if (error) return { error: error.message, success: false };

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  return { error: null, success: true };
}

export async function deleteGalleryItem(id: string): Promise<void> {
  await requireAdmin();
  const supabase = createSupabaseServerClient();

  const { data } = await supabase
    .from("gallery_items")
    .select("image_url, original_webp_url, thumbnail_url, thumbnail_webp_url")
    .eq("id", id)
    .single();

  await supabase.from("gallery_items").delete().eq("id", id);

  if (data) {
    const paths: string[] = [];
    const urls = [
      data.image_url,
      data.original_webp_url,
      data.thumbnail_url,
      data.thumbnail_webp_url,
    ];
    for (const url of urls) {
      if (!url) continue;
      const match = url.match(/\/storage\/v1\/object\/public\/gallery\/(.+)$/);
      if (match) paths.push(decodeURIComponent(match[1]));
    }
    if (paths.length > 0) {
      await supabase.storage.from("gallery").remove(paths).catch(() => {});
    }
  }

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}
