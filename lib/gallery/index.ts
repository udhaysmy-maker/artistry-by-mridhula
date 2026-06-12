import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

export type GalleryRow = Tables<"gallery_items">;

export async function getGalleryItems(): Promise<GalleryRow[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getFeaturedGalleryItems(limit = 6): Promise<GalleryRow[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("id, title, image_url, original_webp_url, thumbnail_url, thumbnail_webp_url, category, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getGalleryItemsByCategory(
  category: string,
): Promise<GalleryRow[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
