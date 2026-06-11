import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /login itself always passes through — avoids redirect loops
  if (pathname === "/login") return NextResponse.next();

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          // Write refreshed tokens to both request and response so they propagate
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: getUser() must run immediately after createServerClient.
  // It refreshes the session and writes new tokens via setAll above.
  let user = null;
  try {
    const { data, error } = await supabase.auth.getUser();
    if (!error) user = data.user;
  } catch {
    // AuthApiError (e.g. "Invalid Refresh Token: Refresh Token Not Found")
    // Treat as unauthenticated and clear stale cookies below.
  }

  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    const redirectResponse = NextResponse.redirect(loginUrl);

    // Clear stale Supabase auth cookies so the login page starts clean
    request.cookies.getAll().forEach(({ name }) => {
      if (name.startsWith("sb-")) {
        redirectResponse.cookies.delete(name);
      }
    });

    return redirectResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
