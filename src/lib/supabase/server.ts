import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/helpers/constants";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      }
    }
  });

  // return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  //   cookies: {
  //     get(name: string) {
  //       return cookieStore.get(name)?.value;
  //     },
  //     set(name: string, value: string, options: CookieOptions) {
  //       try {
  //         cookieStore.set({ name, value, ...options });
  //       } catch (error) {
  //         console.info("Could not set cookie", name);
  //       }
  //     },
  //     remove(name: string, options: CookieOptions) {
  //       try {
  //         cookieStore.set({ name, value: "", ...options });
  //       } catch (error) {
  //         console.info("Could not remove cookie", name);
  //       }
  //     }
  //   }
  // });
}
