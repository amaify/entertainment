import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  console.log("Cannot find database url");
}

export default {
  schema: "./src/lib/supabase/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: dbUrl || "",
  },
} as Config;
