import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  console.log("Middleware", url.pathname);
  // Set Cache-Control header for the root path
  if (url.pathname === "/") {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  // Rewrite URLs ending with .md to the corresponding API route
  if (url.pathname.endsWith(".md")) {
    url.pathname = `/api${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/blog/:path*.md", "/projects/:path*.md"],
};
