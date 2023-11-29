import express from "express";
import { env } from "./utils/env.mjs";

async function main() {
  const app = express();

  app.get("/", (_req, res) => {
    res.send("Hello World!");
  });

  app.listen(env.PORT, () => {
    console.log(`Example app listening at http://localhost:${env.PORT}`);
  });
}

main();
