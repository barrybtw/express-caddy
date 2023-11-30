import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.mts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgres://postgres:postgres@localhost:5432/postgres",
  },
} satisfies Config;
