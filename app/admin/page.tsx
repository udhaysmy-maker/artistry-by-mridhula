import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";

async function getStats() {
  const supabase = createSupabaseServerClient();
  const [blogs, gallery, products, bookings, messages] = await Promise.all([
    supabase.from("blogs").select("id", { count: "exact", head: true }),
    supabase.from("gallery_items").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("bookings").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }),
  ]);
  return {
    blogs: blogs.count ?? 0,
    gallery: gallery.count ?? 0,
    products: products.count ?? 0,
    bookings: bookings.count ?? 0,
    messages: messages.count ?? 0,
  };
}

export default async function AdminDashboard() {
  let stats = { blogs: 0, gallery: 0, products: 0, bookings: 0, messages: 0 };
  try {
    stats = await getStats();
  } catch {
    // Supabase not available
  }

  const cards = [
    { label: "Blog Posts", value: stats.blogs, href: "/admin/blogs", action: "Manage Blogs" },
    { label: "Gallery Items", value: stats.gallery, href: "/admin/gallery", action: "Manage Gallery" },
    { label: "Products", value: stats.products, href: "/admin/products", action: "Manage Products" },
    { label: "Bookings", value: stats.bookings, href: "/admin/bookings", action: "View Bookings" },
    { label: "Enquiries", value: stats.messages, href: "/admin/messages", action: "View Messages" },
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your content and enquiries
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <div className="font-serif text-4xl font-semibold text-primary">
              {card.value}
            </div>
            <div className="mt-1 text-sm font-medium text-foreground">
              {card.label}
            </div>
            <div className="mt-3 text-xs text-muted-foreground group-hover:text-primary">
              {card.action} &rarr;
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-semibold text-foreground">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/blogs/new"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            + New Blog Post
          </Link>
          <Link
            href="/admin/gallery"
            className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
          >
            + Upload Gallery Image
          </Link>
          <Link
            href="/admin/products/new"
            className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
          >
            + Add Product
          </Link>
        </div>
      </div>
    </div>
  );
}
