import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendTelegramAlert } from "@/lib/telegram";

const EVENT_TYPES = [
  "bridal",
  "engagement",
  "reception",
  "party",
  "sangeet",
  "editorial",
  "other",
];

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const {
    name,
    phone,
    event_date,
    event_type,
    location,
    notes,
  } = body as Record<string, string>;

  if (!name?.trim()) return Response.json({ error: "Name is required" }, { status: 400 });
  if (!phone?.trim()) return Response.json({ error: "Phone is required" }, { status: 400 });
  if (event_type && !EVENT_TYPES.includes(event_type))
    return Response.json({ error: "Invalid event type" }, { status: 400 });

  const { limited } = await checkRateLimit({
    table: "bookings",
    field: "phone",
    value: phone.trim(),
    maxPerHour: 2,
  });
  if (limited) {
    return Response.json(
      { error: "Too many booking requests. Please try again later." },
      { status: 429 },
    );
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("bookings").insert({
    name: name.trim(),
    phone: phone.trim(),
    event_date: event_date || null,
    event_type: event_type || null,
    location: location?.trim() || null,
    notes: notes?.trim() || null,
    status: "pending",
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  void sendTelegramAlert(
    `📅 <b>New Booking Request</b>\n\n` +
    `👤 <b>${name.trim()}</b>\n` +
    `📞 ${phone.trim()}\n` +
    (event_type ? `💍 Event: ${event_type}\n` : "") +
    (event_date ? `📆 Date: ${event_date}\n` : "") +
    (location?.trim() ? `📍 Location: ${location.trim()}\n` : "") +
    (notes?.trim() ? `\n📝 ${notes.trim()}` : "")
  );

  return Response.json({ ok: true }, { status: 201 });
}
