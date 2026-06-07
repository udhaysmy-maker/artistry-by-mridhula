import { redirect } from "next/navigation";

// Legacy route — admin auth now handled via /login (Supabase Auth)
export default function AdminLoginLegacyPage() {
  redirect("/admin");
}
