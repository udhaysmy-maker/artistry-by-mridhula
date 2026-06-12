import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/types";

export type BlogPost = Tables<"blogs">;

const LIST_FIELDS =
  "id, title, slug, excerpt, cover_image, cover_thumbnail_url, published_at, created_at";

export async function getPosts(options?: {
  limit?: number;
}): Promise<BlogPost[]> {
  const supabase = createSupabaseServerClient();
  let query = supabase
    .from("blogs")
    .select(LIST_FIELDS)
    .order("published_at", { ascending: false });

  if (options?.limit) query = query.limit(options.limit);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as BlogPost[];
}

export async function getPaginatedPosts(
  page: number,
  perPage: number,
): Promise<{ posts: BlogPost[]; total: number }> {
  const supabase = createSupabaseServerClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, error, count } = await supabase
    .from("blogs")
    .select(LIST_FIELDS, { count: "exact" })
    .order("published_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);
  return { posts: (data ?? []) as BlogPost[], total: count ?? 0 };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }
  return data;
}

export async function getAdjacentPosts(
  publishedAt: string,
): Promise<{ prev: BlogPost | null; next: BlogPost | null }> {
  const supabase = createSupabaseServerClient();
  const [{ data: prev }, { data: next }] = await Promise.all([
    supabase
      .from("blogs")
      .select(LIST_FIELDS)
      .lt("published_at", publishedAt)
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("blogs")
      .select(LIST_FIELDS)
      .gt("published_at", publishedAt)
      .order("published_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);
  return {
    prev: prev as BlogPost | null,
    next: next as BlogPost | null,
  };
}

export async function getRelatedPosts(
  currentSlug: string,
  limit = 3,
): Promise<BlogPost[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("blogs")
    .select(LIST_FIELDS)
    .neq("slug", currentSlug)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []) as BlogPost[];
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
