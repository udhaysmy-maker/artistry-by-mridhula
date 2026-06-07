import Image from "next/image";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { GalleryUploadForm } from "@/components/admin/GalleryUploadForm";
import { deleteGalleryItem } from "./actions";

export const metadata = { title: "Gallery" };

export default async function AdminGalleryPage() {
  const supabase = createSupabaseServerClient();
  const { data: items } = await supabase
    .from("gallery_items")
    .select("id, title, image_url, category")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Gallery
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload images and manage your portfolio gallery.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-semibold text-foreground">Upload New Image</h2>
        <GalleryUploadForm />
      </div>

      {!items || items.length === 0 ? (
        <p className="rounded-2xl border border-border p-8 text-center text-muted-foreground">
          No gallery images yet. Upload your first image above.
        </p>
      ) : (
        <div>
          <h2 className="mb-4 font-semibold text-foreground">
            All Images ({items.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="flex items-start justify-between gap-2 p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs capitalize text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                  <form
                    action={async () => {
                      "use server";
                      await deleteGalleryItem(item.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="shrink-0 rounded-lg px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
