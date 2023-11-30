import express from "express";
import { env } from "./utils/env.mjs";
import { main_router } from "./routes/index.mjs";

async function main() {
  const app = express();

  app.use("/api", main_router);

  app.listen(env.PORT, () => {
    console.log(`Example app listening at http://localhost:${env.PORT}`);
  });
}

main();
