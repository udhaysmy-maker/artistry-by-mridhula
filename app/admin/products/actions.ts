"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/auth";

export async function createProduct(
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const image_url = (formData.get("image_url") as string)?.trim() || null;
  const affiliate_url = (formData.get("affiliate_url") as string)?.trim();
  const category = (formData.get("category") as string)?.trim() || null;

  if (!name) return { error: "Product name is required" };
  if (!affiliate_url) return { error: "Affiliate URL is required" };

  try {
    new URL(affiliate_url);
  } catch {
    return { error: "Affiliate URL must be a valid URL" };
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("products")
    .insert({ name, description, image_url, affiliate_url, category });

  if (error) return { error: error.message };

  revalidatePath("/products");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  await requireAdmin();

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const image_url = (formData.get("image_url") as string)?.trim() || null;
  const affiliate_url = (formData.get("affiliate_url") as string)?.trim();
  const category = (formData.get("category") as string)?.trim() || null;

  if (!name) return { error: "Product name is required" };
  if (!affiliate_url) return { error: "Affiliate URL is required" };

  try {
    new URL(affiliate_url);
  } catch {
    return { error: "Affiliate URL must be a valid URL" };
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("products")
    .update({ name, description, image_url, affiliate_url, category })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/products");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string): Promise<void> {
  await requireAdmin();
  const supabase = createSupabaseServerClient();
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/products");
  revalidatePath("/admin/products");
}
