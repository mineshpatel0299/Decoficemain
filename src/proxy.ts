import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COMMERCIAL_HOST = "commercial.decofice.com";
const COMMERCIAL_PATH = "/commercial";
const COMMERCIAL_SUCCESS_PATH = "/enquiry-success";
const COMMERCIAL_REJECTED_PATH = "/enquiry-rejected";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

export function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname.toLowerCase();
  const { pathname } = request.nextUrl;
  const isCommercialPath = pathname === COMMERCIAL_PATH || pathname.startsWith(`${COMMERCIAL_PATH}/`);

  if (hostname === COMMERCIAL_HOST) {
    if (pathname === "/") {
      const destination = request.nextUrl.clone();
      destination.pathname = COMMERCIAL_PATH;
      return NextResponse.rewrite(destination);
    }

    if (isCommercialPath) {
      const destination = request.nextUrl.clone();
      destination.pathname = pathname.slice(COMMERCIAL_PATH.length) || "/";
      return NextResponse.redirect(destination, 308);
    }

    return NextResponse.next();
  }

  const isCommercialOutcomePath = pathname === COMMERCIAL_SUCCESS_PATH || pathname === COMMERCIAL_REJECTED_PATH;

  if ((isCommercialPath || isCommercialOutcomePath) && !LOCAL_HOSTS.has(hostname)) {
    const destination = request.nextUrl.clone();
    destination.protocol = "https:";
    destination.hostname = COMMERCIAL_HOST;
    destination.port = "";
    destination.pathname = isCommercialPath
      ? pathname.slice(COMMERCIAL_PATH.length) || "/"
      : pathname;
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/commercial/:path*", "/enquiry-success", "/enquiry-rejected"],
};
