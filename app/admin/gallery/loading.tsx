export default function AdminGalleryLoading() {
  return (
    <div className="max-w-4xl animate-pulse space-y-8">
      <div>
        <div className="h-9 w-28 rounded-xl bg-secondary" />
        <div className="mt-1.5 h-4 w-72 rounded bg-secondary/60" />
      </div>

      {/* Upload form card */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 h-5 w-36 rounded bg-secondary" />
        <div className="h-32 w-full rounded-xl bg-secondary/60" />
      </div>

      {/* Image grid */}
      <div>
        <div className="mb-4 h-5 w-32 rounded bg-secondary" />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="aspect-[4/3] w-full bg-secondary" />
              <div className="flex items-center justify-between p-3">
                <div className="space-y-1.5">
                  <div className="h-3.5 w-24 rounded bg-secondary" />
                  <div className="h-3 w-16 rounded bg-secondary/60" />
                </div>
                <div className="h-6 w-12 rounded-lg bg-secondary/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
