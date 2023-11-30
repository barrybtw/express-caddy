import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "../utils/env.mjs";
import { logger } from "../utils/logger.mjs";

const connectionString = env.DATABASE_URL;
const sql = postgres(connectionString, { max: 1 });
export const db = drizzle(sql);

export const migrate_db = async () => {
  logger.info(env.NODE_ENV, env.SKIP_MIGRATIONS);
  if (env.NODE_ENV === "production") return;
  if (env.SKIP_MIGRATIONS === "true") return;
  logger.info("Migrating database");
  await migrate(db, { migrationsFolder: "drizzle" });
  logger.info("Database migrated");
};
