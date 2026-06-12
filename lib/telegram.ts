export async function sendTelegramAlert(text: string): Promise<void> {
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TOKEN || !CHAT_ID) {
    console.error("[telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    });
    const json = await res.json();
    if (!res.ok) {
      console.error("[telegram] API error:", JSON.stringify(json));
    } else {
      console.log("[telegram] Sent OK, message_id:", (json as Record<string, Record<string, unknown>>).result?.message_id);
    }
  } catch (err) {
    console.error("[telegram] Fetch failed:", err);
  }
}
