import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

if (!process.env.VENUES_DATABASE_URL) {
  throw new Error("VENUES_DATABASE_URL is not defined");
}

const sql = neon(process.env.VENUES_DATABASE_URL);
export const venuesDb = drizzle(sql);