import { getSettings } from "@/lib/settings";
import { FloatingActions } from "./FloatingActions";

function instagramUrlFromId(raw: string): string {
  if (!raw) return "";
  if (raw.startsWith("http")) return raw;
  return `https://www.instagram.com/${raw.replace(/^@/, "")}/`;
}

export async function WhatsAppButtonServer() {
  const s = await getSettings();

  const phone = (s.whatsapp || s.phone || process.env.NEXT_PUBLIC_PHONE || "").trim();
  const email = (s.email || process.env.NEXT_PUBLIC_EMAIL || "").trim();
  const instagramUrl =
    s.instagram_url ||
    instagramUrlFromId((process.env.NEXT_PUBLIC_INSTAID ?? "").trim());

  return <FloatingActions phone={phone} email={email} instagramUrl={instagramUrl} />;
}
