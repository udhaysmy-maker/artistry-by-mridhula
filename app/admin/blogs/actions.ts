"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/auth";

export async function createBlog(
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim() || null;
  const content = (formData.get("content") as string)?.trim();
  const cover_image = (formData.get("cover_image") as string)?.trim() || null;
  const published_at =
    (formData.get("published_at") as string)?.trim() ||
    new Date().toISOString();

  if (!title) return { error: "Title is required" };
  if (!slug || !/^[a-z0-9-]+$/.test(slug))
    return { error: "Slug must be lowercase letters, numbers, and hyphens only" };
  if (!content) return { error: "Content is required" };

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("blogs")
    .insert({ title, slug, excerpt, content, cover_image, published_at });

  if (error) return { error: error.message };

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function updateBlog(
  id: string,
  _prev: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  await requireAdmin();

  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim() || null;
  const content = (formData.get("content") as string)?.trim();
  const cover_image = (formData.get("cover_image") as string)?.trim() || null;
  const published_at = (formData.get("published_at") as string)?.trim();

  if (!title) return { error: "Title is required" };
  if (!slug || !/^[a-z0-9-]+$/.test(slug))
    return { error: "Slug must be lowercase letters, numbers, and hyphens only" };
  if (!content) return { error: "Content is required" };

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("blogs")
    .update({
      title,
      slug,
      excerpt,
      content,
      cover_image,
      ...(published_at ? { published_at } : {}),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function deleteBlog(id: string): Promise<void> {
  await requireAdmin();
  const supabase = createSupabaseServerClient();
  await supabase.from("blogs").delete().eq("id", id);
  revalidatePath("/blog");
  revalidatePath("/admin/blogs");
}
