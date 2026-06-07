"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClientFromCookies } from "@/lib/supabase/ssr";

export async function requireAdmin(): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClientFromCookies(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
}
