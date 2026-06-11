"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClientFromCookies } from "@/lib/supabase/ssr";

export async function requireAdmin(): Promise<void> {
  const cookieStore = await cookies();
  const supabase = createSupabaseServerClientFromCookies(cookieStore);
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error || !user) redirect("/login");
  } catch {
    // AuthApiError (e.g. invalid refresh token) — treat as unauthenticated
    redirect("/login");
  }
}
