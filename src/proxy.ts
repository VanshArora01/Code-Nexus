import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limit (Reset on server restart)
// For production with multiple instances, Redis is recommended.
const rateLimit = new Map<string, { count: number; lastReset: number }>();

const LIMIT = 5; // 5 requests
const WINDOW = 60 * 1000; // 1 minute

export function proxy(request: NextRequest) {
  // Only apply to form submission routes or critical APIs
  if (
    request.nextUrl.pathname.startsWith("/api/forms") ||
    request.nextUrl.pathname === "/contact" || 
    request.nextUrl.pathname === "/careers"
  ) {
    if (request.method !== "POST") return NextResponse.next();

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const now = Date.now();
    const state = rateLimit.get(ip) ?? { count: 0, lastReset: now };

    if (now - state.lastReset > WINDOW) {
      state.count = 0;
      state.lastReset = now;
    }

    if (state.count >= LIMIT) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    state.count++;
    rateLimit.set(ip, state);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/contact", "/careers", "/api/:path*"],
};
