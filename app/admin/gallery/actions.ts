"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/auth";

const CATEGORIES = ["bridal", "engagement", "party", "editorial", "other"];

export async function createGalleryItem(
  _prev: { error: string | null; success: boolean },
  formData: FormData,
): Promise<{ error: string | null; success: boolean }> {
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const image_url = (formData.get("image_url") as string)?.trim();
  const category = (formData.get("category") as string)?.trim();

  if (!title) return { error: "Title is required", success: false };
  if (!image_url) return { error: "Image is required", success: false };
  if (!category || !CATEGORIES.includes(category))
    return { error: "Please select a valid category", success: false };

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("gallery_items")
    .insert({ title, image_url, category });

  if (error) return { error: error.message, success: false };

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
  return { error: null, success: true };
}

export async function deleteGalleryItem(id: string): Promise<void> {
  await requireAdmin();
  const supabase = createSupabaseServerClient();
  await supabase.from("gallery_items").delete().eq("id", id);
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}
