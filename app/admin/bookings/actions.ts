"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/auth";

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<void> {
  await requireAdmin();
  const supabase = createSupabaseServerClient();
  await supabase.from("bookings").update({ status }).eq("id", id);
  revalidatePath("/admin/bookings");
}

export async function deleteBooking(id: string): Promise<void> {
  await requireAdmin();
  const supabase = createSupabaseServerClient();
  await supabase.from("bookings").delete().eq("id", id);
  revalidatePath("/admin/bookings");
}
