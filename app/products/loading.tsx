export default function ProductsLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-secondary/30 py-20 text-center">
        <div className="mx-auto h-3 w-16 rounded bg-secondary" />
        <div className="mx-auto mt-4 h-10 w-72 rounded bg-secondary" />
        <div className="mx-auto mt-4 h-4 w-96 rounded bg-secondary/70" />
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-20">
        <div className="mb-8 flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-secondary" />
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="h-48 bg-secondary" />
              <div className="space-y-2 p-4">
                <div className="h-4 w-3/4 rounded bg-secondary" />
                <div className="h-3 w-1/2 rounded bg-secondary/70" />
                <div className="mt-3 h-8 w-28 rounded-full bg-secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
