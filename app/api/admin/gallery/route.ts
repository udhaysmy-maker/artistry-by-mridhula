import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { processGalleryImage } from "@/lib/images/process";

const MAX_BYTES = 15 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const authClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs) =>
          cs.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          ),
      },
    },
  );
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0)
    return Response.json({ error: "No file provided" }, { status: 400 });
  if (file.size > MAX_BYTES)
    return Response.json({ error: "File exceeds 15 MB limit" }, { status: 413 });
  if (!ALLOWED_TYPES.has(file.type))
    return Response.json({ error: "Only JPEG, PNG, or WebP allowed" }, { status: 415 });

  const buffer = Buffer.from(await file.arrayBuffer());
  let processed: Awaited<ReturnType<typeof processGalleryImage>>;
  try {
    processed = await processGalleryImage(buffer);
  } catch (e) {
    console.error("[gallery/upload] Sharp error:", e);
    return Response.json({ error: "Image processing failed" }, { status: 500 });
  }

  const timestamp = Date.now();
  const safeName = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .slice(0, 40);
  const base = `${timestamp}-${safeName}`;

  const supabase = createSupabaseServerClient();

  const up = (path: string, body: Buffer, type: string) =>
    supabase.storage.from("gallery").upload(path, body, {
      contentType: type,
      cacheControl: "31536000",
      upsert: false,
    });

  const [origJpg, origWebp, thumbJpg, thumbWebp] = await Promise.all([
    up(`originals/${base}.jpg`,  processed.mainJpeg,  "image/jpeg"),
    up(`originals/${base}.webp`, processed.mainWebp,  "image/webp"),
    up(`thumbnails/${base}.jpg`, processed.thumbJpeg, "image/jpeg"),
    up(`thumbnails/${base}.webp`,processed.thumbWebp, "image/webp"),
  ]);

  for (const result of [origJpg, origWebp, thumbJpg, thumbWebp]) {
    if (result.error)
      return Response.json({ error: result.error.message }, { status: 500 });
  }

  const pub = (path: string) =>
    supabase.storage.from("gallery").getPublicUrl(path).data.publicUrl;

  return Response.json(
    {
      originalUrl:    pub(origJpg.data!.path),
      originalWebpUrl: pub(origWebp.data!.path),
      thumbnailUrl:   pub(thumbJpg.data!.path),
      thumbnailWebpUrl: pub(thumbWebp.data!.path),
    },
    { status: 201 },
  );
}
