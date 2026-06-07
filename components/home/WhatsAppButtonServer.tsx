import { getSettings } from "@/lib/settings";
import { WhatsAppButton } from "./WhatsAppButton";

export async function WhatsAppButtonServer() {
  const s = await getSettings();
  const phone = s.whatsapp || s.phone;
  return <WhatsAppButton phone={phone} />;
}
