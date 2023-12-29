import { CookieOptions, createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/src/helpers/constants";

export function createClient(request: NextRequest) {
  let response = NextResponse.next();

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        // If the cookie is updated, update the cookies for the request and response
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next();
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        // If the cookie is removed, update the cookies for the request and response
        request.cookies.set({ name, value: "", ...options });
        response = NextResponse.next();
        response.cookies.set({ name, value: "", ...options });
      }
    }
  });

  return { supabase, response };
}
