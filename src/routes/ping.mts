import express from "express";

const ping_router = express.Router();

ping_router.get("/", (req, res) => {
  res.send("Pong!");
});

export { ping_router };
