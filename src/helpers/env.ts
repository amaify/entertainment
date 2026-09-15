import { z } from "zod";

const envSchema = z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.url({ protocol: /^https$/ }),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "SUPABASE_ANON_KEY is not provided"),
    NEXT_PUBLIC_TMDB_BASE_URI: z.url({ protocol: /^https$/ }),
    NEXT_PUBLIC_TMDB_API_KEY: z.string().min(1, "TMDB_API_KEY is not provided"),
    NEXT_PUBLIC_TMDB_IMAGE_URI: z.url({ protocol: /^https$/ }),
});

export type EnvSchema = z.infer<typeof envSchema>;
export const env = envSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_TMDB_BASE_URI: process.env.NEXT_PUBLIC_TMDB_BASE_URI,
    NEXT_PUBLIC_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    NEXT_PUBLIC_TMDB_IMAGE_URI: process.env.NEXT_PUBLIC_TMDB_IMAGE_URI,
});
