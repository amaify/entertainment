import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

dotenv.config({ path: ".env" });

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  console.log("Cannot find database url");
}

console.log("🔵 Using database url", dbUrl);

const client = postgres(dbUrl as string, { max: 1 });
const db = drizzle(client, { schema });
const migrateDb = async () => {
  try {
    console.log("🟠 Migrating client");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("🟢 Successfully migrated client");
  } catch (error) {
    console.log("🔴 Error migrating client", error);
  }
};
migrateDb();
export default db;
