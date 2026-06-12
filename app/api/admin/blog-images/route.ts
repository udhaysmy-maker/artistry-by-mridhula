import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/auth";
import { processBlogImage } from "@/lib/images/process";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
const MAX_BYTES = 15 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const altText = ((formData.get("alt_text") as string | null) ?? "").trim();

  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Only JPEG, PNG, or WebP images allowed" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File exceeds 15 MB limit" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const { heroWebp, thumbWebp } = await processBlogImage(buffer);

  const base = randomUUID();
  const supabase = createSupabaseServerClient();

  const [origUpload, thumbUpload] = await Promise.all([
    supabase.storage
      .from("blog-images")
      .upload(`originals/${base}.webp`, heroWebp, {
        contentType: "image/webp",
        upsert: false,
      }),
    supabase.storage
      .from("blog-images")
      .upload(`thumbnails/${base}.webp`, thumbWebp, {
        contentType: "image/webp",
        upsert: false,
      }),
  ]);

  if (origUpload.error || thumbUpload.error) {
    return NextResponse.json(
      { error: origUpload.error?.message ?? thumbUpload.error?.message },
      { status: 500 },
    );
  }

  const {
    data: { publicUrl: originalWebpUrl },
  } = supabase.storage.from("blog-images").getPublicUrl(`originals/${base}.webp`);
  const {
    data: { publicUrl: thumbnailWebpUrl },
  } = supabase.storage.from("blog-images").getPublicUrl(`thumbnails/${base}.webp`);

  // Best-effort record in blog_images table (requires migration to have been run)
  await supabase.from("blog_images").insert({
    alt_text: altText || null,
    original_webp_url: originalWebpUrl,
    thumbnail_webp_url: thumbnailWebpUrl,
  });

  return NextResponse.json({ originalWebpUrl, thumbnailWebpUrl });
}
