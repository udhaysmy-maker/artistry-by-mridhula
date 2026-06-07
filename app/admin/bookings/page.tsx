import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/blog";
import { updateBookingStatus, deleteBooking } from "./actions";

export const metadata = { title: "Bookings" };

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
};

interface Props {
  searchParams: Promise<{ q?: string; status?: string }>;
}

export default async function AdminBookingsPage({ searchParams }: Props) {
  const { q, status } = await searchParams;
  const supabase = createSupabaseServerClient();

  let query = supabase
    .from("bookings")
    .select("id, name, phone, event_date, event_type, location, status, created_at")
    .order("created_at", { ascending: false });

  if (q) query = query.or(`name.ilike.%${q}%,phone.ilike.%${q}%`);
  if (status) query = query.eq("status", status);

  const { data: bookings } = await query;

  const statuses = ["pending", "confirmed", "completed", "cancelled"];

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Bookings
        </h1>
        <form method="GET" className="flex flex-wrap gap-2">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search name or phone…"
            className="w-48 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <select
            name="status"
            defaultValue={status ?? ""}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          >
            <option value="">All statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s} className="capitalize">
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
          >
            Filter
          </button>
          {(q || status) && (
            <a
              href="/admin/bookings"
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Clear
            </a>
          )}
        </form>
      </div>

      {!bookings || bookings.length === 0 ? (
        <p className="rounded-2xl border border-border p-8 text-center text-muted-foreground">
          {q || status ? "No bookings match your filter." : "No bookings yet."}
        </p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-semibold text-foreground">
                    {booking.name}
                  </span>
                  <a
                    href={`tel:${booking.phone}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {booking.phone}
                  </a>
                  {booking.event_type && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs capitalize text-foreground">
                      {booking.event_type}
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[booking.status] ?? "bg-secondary text-foreground"}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{formatDate(booking.created_at)}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
                <div className="space-y-1 text-sm">
                  {booking.event_date && (
                    <p className="text-foreground">
                      <span className="font-medium">Event:</span>{" "}
                      {new Date(booking.event_date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  {booking.location && (
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Venue:</span>{" "}
                      {booking.location}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {(["pending", "confirmed", "completed", "cancelled"] as const).map(
                    (s) =>
                      s !== booking.status ? (
                        <form
                          key={s}
                          action={async () => {
                            "use server";
                            await updateBookingStatus(booking.id, s);
                          }}
                        >
                          <button
                            type="submit"
                            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium capitalize hover:bg-secondary"
                          >
                            Mark {s}
                          </button>
                        </form>
                      ) : null,
                  )}
                  <form
                    action={async () => {
                      "use server";
                      await deleteBooking(booking.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="rounded-lg px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
