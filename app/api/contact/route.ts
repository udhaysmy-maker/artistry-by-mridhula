import type { NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import type { InsertPayload } from "@/lib/supabase/types";
import { sendTelegramAlert } from "@/lib/telegram";

interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  eventDate?: string;
  service?: string;
  message: string;
}

function validate(body: unknown): {
  data: ContactPayload | null;
  errors: string[];
} {
  if (!body || typeof body !== "object") {
    return { data: null, errors: ["Invalid request body"] };
  }

  const b = body as Record<string, unknown>;
  const errors: string[] = [];

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const eventDate =
    typeof b.eventDate === "string" ? b.eventDate.trim() : undefined;
  const service =
    typeof b.service === "string" ? b.service.trim() : undefined;

  if (!name || name.length > 100) errors.push("Valid name is required (max 100 characters)");
  if (!phone || phone.length > 20) errors.push("Valid phone number is required");
  if (!email || !email.includes("@") || email.length > 255)
    errors.push("Valid email address is required");
  if (!message || message.length < 10 || message.length > 2000)
    errors.push("Message must be between 10 and 2000 characters");
  if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate))
    errors.push("Event date must be in YYYY-MM-DD format");

  if (errors.length > 0) return { data: null, errors };

  return {
    data: { name, phone, email, message, eventDate, service },
    errors: [],
  };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { message: "Invalid JSON in request body" },
      { status: 400 },
    );
  }

  const { data, errors } = validate(body);
  if (!data) {
    return Response.json({ message: errors[0], errors }, { status: 422 });
  }

  const { limited } = await checkRateLimit({
    table: "contact_messages",
    field: "email",
    value: data.email,
    maxPerHour: 3,
  });
  if (limited) {
    return Response.json(
      { message: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  const supabase = createSupabaseServerClient();

  const payload: InsertPayload<"contact_messages"> = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    message: data.message,
    event_date: data.eventDate || null,
    service: data.service || null,
  };

  const { error } = await supabase.from("contact_messages").insert(payload);

  if (error) {
    console.error("[contact/route] Supabase insert error:", error.message);
    return Response.json(
      { message: "Unable to send your message. Please try again." },
      { status: 500 },
    );
  }

  void sendTelegramAlert(
    `💬 <b>New Message</b>\n\n` +
    `👤 <b>${data.name}</b>\n` +
    `📞 ${data.phone}\n` +
    `📧 ${data.email}\n` +
    (data.service ? `💄 Service: ${data.service}\n` : "") +
    (data.eventDate ? `📅 Event: ${data.eventDate}\n` : "") +
    `\n${data.message}`
  );

  return Response.json(
    { message: "Message received. We'll be in touch within 24 hours." },
    { status: 201 },
  );
}
