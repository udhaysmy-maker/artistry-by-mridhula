import { createSupabaseServerClient } from "./supabase/server";

interface RateLimitOptions {
  table: "contact_messages" | "bookings";
  field: string;
  value: string;
  maxPerHour: number;
}

/**
 * Supabase-backed rate limiter — counts recent rows from the same field value.
 * Works across serverless instances without Redis.
 */
export async function checkRateLimit({
  table,
  field,
  value,
  maxPerHour,
}: RateLimitOptions): Promise<{ limited: boolean }> {
  try {
    const supabase = createSupabaseServerClient();
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { count } = await supabase
      .from(table)
      .select("id", { count: "exact", head: true })
      .eq(field as never, value)
      .gte("created_at", oneHourAgo);

    return { limited: (count ?? 0) >= maxPerHour };
  } catch {
    // If rate-limit check fails, allow the request through
    return { limited: false };
  }
}
