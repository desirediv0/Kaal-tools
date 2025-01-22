import { NextResponse } from "next/server";

export function middleware(request) {
  // Create a new headers object from existing request headers
  const requestHeaders = new Headers(request.headers);

  // Add a custom no-cache header
  requestHeaders.set("x-middleware-cache", "no-cache");

  // Continue to the next middleware/route with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
