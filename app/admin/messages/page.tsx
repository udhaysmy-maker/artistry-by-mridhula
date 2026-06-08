import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/blog";
import { deleteMessage } from "./actions";

export const metadata = { title: "Messages" };

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminMessagesPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const supabase = createSupabaseServerClient();

  let query = supabase
    .from("contact_messages")
    .select("id, name, phone, email, service, event_date, message, created_at")
    .order("created_at", { ascending: false });

  if (q) {
    query = query.or(
      `name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`,
    );
  }

  const { data: messages } = await query;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-3xl font-semibold text-foreground">
          Enquiries
        </h1>
        <form method="GET" className="flex flex-wrap gap-2">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search by name, email or phone…"
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 sm:w-56"
          />
          <button
            type="submit"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
          >
            Search
          </button>
          {q && (
            <a
              href="/admin/messages"
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              Clear
            </a>
          )}
        </form>
      </div>

      {!messages || messages.length === 0 ? (
        <p className="rounded-2xl border border-border p-8 text-center text-muted-foreground">
          {q ? `No enquiries matching "${q}".` : "No enquiries yet."}
        </p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-5 py-4">
                <div>
                  <span className="font-semibold text-foreground">
                    {msg.name}
                  </span>
                  <span className="mx-2 text-muted-foreground">&middot;</span>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {msg.email}
                  </a>
                  {msg.phone && (
                    <>
                      <span className="mx-2 text-muted-foreground">&middot;</span>
                      <a
                        href={`tel:${msg.phone}`}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        {msg.phone}
                      </a>
                    </>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(msg.created_at)}
                  </span>
                  <form
                    action={async () => {
                      "use server";
                      await deleteMessage(msg.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="text-xs text-destructive hover:underline"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
              <div className="px-5 py-4 text-sm text-foreground/90">
                {msg.service && (
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Service: {msg.service}
                    {msg.event_date && ` · Event: ${msg.event_date}`}
                  </p>
                )}
                <p className="whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
