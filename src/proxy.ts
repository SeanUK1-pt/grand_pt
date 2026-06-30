import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Named "proxy.ts" rather than "middleware.ts" because this Next.js version
// (16.x) deprecated and renamed the middleware file convention to "proxy" —
// see node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md.
// next-intl's createMiddleware() return value is just a NextRequest -> NextResponse
// handler; it doesn't care what the file/export is named, so this is a
// drop-in rename with no behavioral difference from the "middleware.ts" setup
// shown in next-intl's own docs.
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for ones starting with /api, /_next, /_vercel,
  // or containing a dot (e.g. /favicon.ico, /images/foo.jpg)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
