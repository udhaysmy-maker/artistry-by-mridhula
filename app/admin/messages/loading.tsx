export default function AdminMessagesLoading() {
  return (
    <div className="max-w-4xl animate-pulse space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-9 w-32 rounded-xl bg-secondary" />
        <div className="flex gap-2">
          <div className="h-9 w-56 rounded-lg bg-secondary" />
          <div className="h-9 w-16 rounded-lg bg-secondary" />
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-4 w-28 rounded bg-secondary" />
                <div className="h-4 w-40 rounded bg-secondary/60" />
                <div className="h-4 w-24 rounded bg-secondary/50" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-3 w-24 rounded bg-secondary/50" />
                <div className="h-3 w-12 rounded bg-secondary/40" />
              </div>
            </div>
            <div className="space-y-2 px-5 py-4">
              <div className="h-3 w-40 rounded bg-secondary/50" />
              <div className="h-3.5 w-full rounded bg-secondary/60" />
              <div className="h-3.5 w-4/5 rounded bg-secondary/50" />
              <div className="h-3.5 w-3/5 rounded bg-secondary/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
