import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Allowed bot user agents to bypass all restrictions
const ALLOWED_BOTS = [
  "googlebot",
  "google-inspectiontool",
  "adsbot-google",
  "mediapartners-google",
  "bingbot",
  "yandexbot",
  "duckduckbot",
  "slurp",
  "baiduspider",
];

export function proxy(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // 1. Always allow critical SEO and public files
  if (
    url === "/robots.txt" ||
    url === "/sitemap.xml" ||
    url === "/favicon.ico" ||
    url.startsWith("/_next/")
  ) {
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent")?.toLowerCase() || "";

  // 2. Explicitly bypass ANY rate limiting or blocking for known search engine bots
  const isBot = ALLOWED_BOTS.some((bot) => userAgent.includes(bot));
  if (isBot) {
    return NextResponse.next();
  }

  // 3. Normal traffic - proceed as usual
  // (If there was rate limiting logic, it would go here for non-bots)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
