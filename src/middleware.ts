import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  try {
    const { supabase, response } = createClient(request);
    await supabase.auth.getSession();
    return response;
  } catch (error) {
    console.info("🔴 Could not create supabas client", error);

    return NextResponse.next({ request: { headers: request.headers } });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ]
};
