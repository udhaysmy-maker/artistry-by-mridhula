import { BlogForm } from "@/components/admin/BlogForm";
import { createBlog } from "../actions";

export const metadata = { title: "New Blog Post" };

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          New Blog Post
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Write your post, use the toolbar for special elements, and preview before publishing.
        </p>
      </div>
      <BlogForm action={createBlog} />
    </div>
  );
}
