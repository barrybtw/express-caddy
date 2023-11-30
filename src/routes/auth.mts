import express from "express";
import bcrypt from "bcrypt";
import { logger } from "../utils/logger.mjs";
import {
  prepared_add_user,
  prepared_get_session_by_token,
} from "../db/prepared_statements.mjs";

const auth_router = express.Router();

auth_router.get("/me", async (req, res) => {
  const session = req.cookies["session_identifier"];
  const csrf = req.headers["csrf_token"];

  if (!session || !csrf) {
    logger.error("Missing session or csrf token");
    res.status(401).send("Unauthorized");
    return;
  }

  const db_session = await prepared_get_session_by_token.execute({
    token: session,
  });

  if (db_session.length === 0) {
    logger.error("No session found");
    res.status(401).send("Unauthorized");
    return;
  }

  res.send(db_session.at(0));
});

auth_router.post("/signup", async (req, res) => {
  const username = req.headers["username"];
  const password = req.headers["password"];

  if (
    !username ||
    !password ||
    Array.isArray(username) ||
    Array.isArray(password)
  ) {
    logger.error("Missing username or password");
    res.status(400).send("Bad Request");
    return;
  }

  const salt = await bcrypt.genSalt(10);

  if (!salt) {
    logger.error("Salt is undefined");
    res.status(500).send("Internal Server Error");
    return;
  }

  const hashed_password = await bcrypt.hash(password, salt);

  if (!hashed_password) {
    logger.error("Hashed password is undefined");
    res.status(500).send("Internal Server Error");
    return;
  }

  await prepared_add_user
    .execute({
      username: username,
      password: hashed_password,
      password_salt: salt,
    })
    .catch((error) => {
      logger.error(error);
      res.status(400).send("Bad Request");
      return;
    });

  res.status(201).redirect("/login");
});

export { auth_router };
