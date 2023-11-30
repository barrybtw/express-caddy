import express from "express";
import { env } from "./utils/env.mjs";
import { main_router } from "./routes/index.mjs";
import { migrate_db } from "./db/index.mjs";
import cookie_parser from "cookie-parser";

async function main() {
  migrate_db();
  const app = express();
  app.use(cookie_parser());
  app.use("/api", main_router);

  app.listen(env.PORT, () => {
    console.log(`Example app listening at http://localhost:${env.PORT}`);
  });
}

main();
