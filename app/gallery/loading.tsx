export default function GalleryLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-secondary/30 py-20 text-center">
        <div className="mx-auto h-3 w-16 rounded bg-secondary" />
        <div className="mx-auto mt-4 h-10 w-48 rounded bg-secondary" />
        <div className="mx-auto mt-4 h-4 w-80 rounded bg-secondary/70" />
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-20">
        <div className="mb-8 flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-full bg-secondary" />
          ))}
        </div>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-secondary"
              style={{
                height: i % 3 === 0 ? "280px" : i % 3 === 1 ? "220px" : "320px",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
