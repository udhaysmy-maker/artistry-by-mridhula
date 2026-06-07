import { BlogForm } from "@/components/admin/BlogForm";
import { createBlog } from "../actions";

export const metadata = { title: "New Blog Post" };

export default function NewBlogPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          New Blog Post
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the fields below and click Create Post.
        </p>
      </div>
      <BlogForm action={createBlog} />
    </div>
  );
}
