import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const defaultLocale = "en";
const locales = ["en", "ar"];

export function middleware(req: NextRequest) {
  const { pathname, locale } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );

  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale || defaultLocale}${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
