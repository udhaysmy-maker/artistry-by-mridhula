export default function AdminLoading() {
  return (
    <div className="max-w-4xl space-y-6 animate-pulse">
      {/* Page title skeleton */}
      <div className="h-9 w-48 rounded-xl bg-secondary" />

      {/* Card grid skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-secondary" />
            <div className="h-4 w-24 rounded bg-secondary" />
            <div className="h-3 w-20 rounded bg-secondary/70" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="overflow-hidden rounded-2xl border border-border">
        <div className="border-b border-border bg-secondary/50 px-5 py-3">
          <div className="h-4 w-32 rounded bg-secondary" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between border-b border-border px-5 py-4 last:border-0">
            <div className="space-y-1.5">
              <div className="h-4 w-56 rounded bg-secondary" />
              <div className="h-3 w-36 rounded bg-secondary/60" />
            </div>
            <div className="flex gap-4">
              <div className="h-3 w-8 rounded bg-secondary/60" />
              <div className="h-3 w-8 rounded bg-secondary/60" />
              <div className="h-3 w-10 rounded bg-secondary/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
