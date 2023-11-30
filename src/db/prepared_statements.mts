import { eq, sql } from "drizzle-orm";
import { db } from "./index.mjs";
import { Sessions, Users } from "./schema.mjs";

export const prepared_add_user = db
  .insert(Users)
  .values({
    username: sql.placeholder("username"),
    password: sql.placeholder("password"),
    password_salt: sql.placeholder("password_salt"),
  })
  .prepare("add_user");

export const prepared_get_user_by_id = db
  .select()
  .from(Users)
  .where(eq(Users.id, sql.placeholder("id")))
  .prepare("get_user_by_id");

export const prepared_get_user_by_username = db
  .select()
  .from(Users)
  .where(eq(Users.username, sql.placeholder("username")))
  .prepare("get_user_by_username");

export const prepared_add_session = db
  .insert(Sessions)
  .values({
    user_id: sql.placeholder("user_id"),
    csrf_token: sql.placeholder("csrf_token"),
    token: sql.placeholder("token"),
  })
  .returning({
    id: Sessions.id,
    user_id: Sessions.user_id,
    token: Sessions.token,
    csrf_token: Sessions.csrf_token,
  })
  .prepare("make_session");

export const prepared_get_session_by_token = db
  .select()
  .from(Sessions)
  .where(eq(Sessions.token, sql.placeholder("token")))
  .prepare("get_session_by_token");

export const kill_session_by_token = db
  .delete(Users)
  .where(eq(Sessions.token, sql.placeholder("token")))
  .prepare("kill_session_by_token");
