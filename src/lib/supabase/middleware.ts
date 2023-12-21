import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/helpers/constants";
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export function createClient(request: NextRequest) {
  let response = NextResponse.next({
    headers: request.headers,
  });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({ headers: request.headers });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: "", ...options });
        response = NextResponse.next({ headers: request.headers });
        response.cookies.set({ name, value: "", ...options });
      },
    },
  });

  return { supabase, response };
}
