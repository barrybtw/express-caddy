import express from "express";
import { ping_router } from "./ping.mjs";
import { auth_router } from "./auth.mjs";

const main_router = express.Router();

main_router.use("/ping", ping_router);
main_router.use("/auth", auth_router);

main_router.get("/", (req, res) => {
  res.send("Hello World!");
});

export { main_router };
