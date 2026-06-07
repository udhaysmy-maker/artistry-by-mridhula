import type { NextRequest } from "next/server";

const SESSION_COOKIE = "abm_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { password } = body as { password?: string };
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return Response.json(
      { error: "Admin is not configured" },
      { status: 503 },
    );
  }

  if (!password || password !== adminPassword) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = Response.json({ ok: true });
  response.headers.set(
    "Set-Cookie",
    `${SESSION_COOKIE}=${adminPassword}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${MAX_AGE}`,
  );
  return response;
}
