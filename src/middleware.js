import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const LOCALES = ["en", "fr", "nl"];
const DEFAULT_LOCALE = "en";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip public files and api routes
  if (PUBLIC_FILE.test(pathname) || pathname.startsWith("/api")) {
    return;
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If it's /en or /en/*, redirect to / or /* (remove en prefix)
    if (pathname.startsWith("/en")) {
      const newPath = pathname.replace(/^\/en/, "") || "/";
      return NextResponse.redirect(new URL(newPath, request.url));
    }
    return;
  }

  // No locale in path = treat as English, rewrite to /en/*
  const newUrl = new URL(`/en${pathname}`, request.url);
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
