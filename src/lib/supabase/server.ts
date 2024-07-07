import { createServerClient } from "@supabase/ssr";
import type { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/helpers/constants";

export async function createClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch (error) {
          console.error("-- Set coookie error ---> ", (error as Error).message);
        }
      }
    }
  });
}
