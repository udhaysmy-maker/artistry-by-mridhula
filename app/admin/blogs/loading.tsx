export default function AdminBlogsLoading() {
  return (
    <div className="max-w-4xl animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-9 w-36 rounded-xl bg-secondary" />
        <div className="h-9 w-28 rounded-full bg-secondary" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="border-b border-border bg-secondary/50 px-5 py-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-4 w-20 rounded bg-secondary" />
            <div className="h-4 w-20 rounded bg-secondary" />
            <div className="ml-auto h-4 w-16 rounded bg-secondary" />
          </div>
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-border px-5 py-4 last:border-0"
          >
            <div className="space-y-1.5">
              <div className="h-4 w-64 rounded bg-secondary" />
              <div className="h-3 w-36 rounded bg-secondary/60" />
            </div>
            <div className="flex items-center gap-6">
              <div className="h-3 w-20 rounded bg-secondary/60" />
              <div className="flex gap-3">
                <div className="h-3 w-8 rounded bg-secondary/60" />
                <div className="h-3 w-8 rounded bg-secondary/60" />
                <div className="h-3 w-10 rounded bg-secondary/60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
