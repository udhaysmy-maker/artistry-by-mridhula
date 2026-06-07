import { BlogCardSkeleton } from "@/components/blog/BlogCard";

export default function BlogLoading() {
  return (
    <div>
      <div className="animate-pulse bg-secondary/30 py-20 text-center">
        <div className="mx-auto h-3 w-16 rounded bg-secondary" />
        <div className="mx-auto mt-4 h-10 w-72 rounded bg-secondary" />
        <div className="mx-auto mt-4 h-4 w-96 rounded bg-secondary/70" />
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
