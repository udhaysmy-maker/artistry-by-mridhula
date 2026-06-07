import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { buildStoragePath, type StorageBucket } from "@/lib/supabase/storage";

const VALID_BUCKETS = new Set<string>(["gallery", "blog-images"]);
const MAX_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

export async function POST(request: NextRequest) {
  // Auth via Supabase session (replaces deprecated ADMIN_PASSWORD cookie)
  const cookieStore = await cookies();
  const authClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );
  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bucket = request.nextUrl.searchParams.get("bucket");
  if (!bucket || !VALID_BUCKETS.has(bucket)) {
    return Response.json({ error: "Invalid bucket" }, { status: 400 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return Response.json({ error: "File exceeds 10 MB limit" }, { status: 413 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return Response.json(
      { error: "Only JPEG, PNG, WebP, and AVIF images are allowed" },
      { status: 415 },
    );
  }

  const supabase = createSupabaseServerClient();
  const path = buildStoragePath("uploads", file.name);

  const { data, error } = await supabase.storage
    .from(bucket as StorageBucket)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from(bucket as StorageBucket)
    .getPublicUrl(data.path);

  return Response.json({ url: urlData.publicUrl }, { status: 201 });
}
