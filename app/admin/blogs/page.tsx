import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { deleteBlog } from "./actions";
import { formatDate } from "@/lib/blog";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const metadata = { title: "Blogs" };

export default async function AdminBlogsPage() {
  const supabase = createSupabaseServerClient();
  const { data: posts } = await supabase
    .from("blogs")
    .select("id, title, slug, published_at, excerpt")
    .order("published_at", { ascending: false });

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Blog Posts
        </h1>
        <Link
          href="/admin/blogs/new"
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          + New Post
        </Link>
      </div>

      {!posts || posts.length === 0 ? (
        <p className="rounded-2xl border border-border p-8 text-center text-muted-foreground">
          No blog posts yet.{" "}
          <Link href="/admin/blogs/new" className="text-primary hover:underline">
            Create your first post.
          </Link>
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary/50">
              <tr>
                <th className="px-5 py-3 text-left font-semibold text-foreground">
                  Title
                </th>
                <th className="px-5 py-3 text-left font-semibold text-foreground">
                  Published
                </th>
                <th className="px-5 py-3 text-right font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-secondary/30">
                  <td className="px-5 py-4">
                    <div className="font-medium text-foreground">{post.title}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      /blog/{post.slug}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {formatDate(post.published_at)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-xs text-muted-foreground hover:text-primary"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/blogs/${post.id}/edit`}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteBlog(post.id);
                        }}
                      >
                        <DeleteButton label={post.title} />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
