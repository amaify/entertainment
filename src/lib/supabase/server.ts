import { createServerClient } from "@supabase/ssr";
import type { cookies } from "next/headers";
import { env } from "@/helpers/env";

export async function createClient(cookieStore: ReturnType<typeof cookies>) {
    return createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet, _headers) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options);
                    });
                } catch (error) {
                    console.error("-- Set coookie error ---> ", (error as Error).message);
                }
            },
        },
    });
}
