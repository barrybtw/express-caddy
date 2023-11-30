import express from "express";

const ping_router = express.Router();

ping_router.get("/", (req, res) => {
  res.send("Hello World!");
});

export { ping_router };
