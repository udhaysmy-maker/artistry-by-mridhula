export default function AdminBookingsLoading() {
  return (
    <div className="max-w-5xl animate-pulse space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-9 w-32 rounded-xl bg-secondary" />
        <div className="flex gap-2">
          <div className="h-9 w-48 rounded-lg bg-secondary" />
          <div className="h-9 w-32 rounded-lg bg-secondary" />
          <div className="h-9 w-16 rounded-lg bg-secondary" />
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="h-4 w-32 rounded bg-secondary" />
                <div className="h-4 w-24 rounded bg-secondary/60" />
                <div className="h-5 w-20 rounded-full bg-secondary/60" />
                <div className="h-5 w-16 rounded-full bg-secondary/60" />
              </div>
              <div className="h-3 w-24 rounded bg-secondary/50" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
              <div className="space-y-2">
                <div className="h-3.5 w-48 rounded bg-secondary/60" />
                <div className="h-3.5 w-40 rounded bg-secondary/50" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-24 rounded-lg bg-secondary" />
                <div className="h-8 w-24 rounded-lg bg-secondary" />
                <div className="h-8 w-16 rounded-lg bg-secondary/60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
