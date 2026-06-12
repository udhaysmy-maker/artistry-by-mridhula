import { sendTelegramAlert } from "@/lib/telegram";

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return Response.json({ error: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: "✅ Test notification from Artistry by Mridhula",
        }),
      }
    );
    const data = await res.json() as Record<string, unknown>;
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}
