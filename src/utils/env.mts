import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

import "dotenv/config";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    SKIP_MIGRATIONS: z.enum(["true", "false"]),
    PORT: z.coerce.number().positive(),
    DATABASE_URL: z.string(),
  },
  runtimeEnv: process.env,
});
