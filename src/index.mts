import express from "express";
import { env } from "./utils/env.mjs";

async function main() {
  const app = express();

  app.get("/api", (_req, res) => {
    console.log("Hello World!");
    res.send("Hello World!");
  });

  app.get("/api/poop", (_, res) => {
    res.send("I shit my pants");
  });

  app.listen(env.PORT, () => {
    console.log(`Example app listening at http://localhost:${env.PORT}`);
  });
}

main();
