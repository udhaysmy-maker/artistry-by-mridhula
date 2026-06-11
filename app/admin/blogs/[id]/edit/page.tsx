import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { BlogForm } from "@/components/admin/BlogForm";
import { updateBlog } from "../../actions";
import type { BlogPost } from "@/lib/blog";

export const metadata = { title: "Edit Blog Post" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;
  const supabase = createSupabaseServerClient();
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  const post = data as BlogPost;
  const boundAction = updateBlog.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Edit Blog Post
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          /blog/{post.slug}
        </p>
      </div>
      <BlogForm action={boundAction} post={post} />
    </div>
  );
}
