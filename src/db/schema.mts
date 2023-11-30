import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const Roles = pgEnum("role", ["unknown", "ADMIN", "USER"]);

export const Users = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username", { length: 20 }).unique(),
  password: text("password"),
  password_salt: text("password_salt"),
  role: Roles("role").default("USER").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUser = createInsertSchema(Users);

export const Sessions = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id")
    .references(() => Users.id)
    .notNull(),
  token: text("token").unique().notNull(),
  csrf_token: text("csrf_token").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const insertSession = createInsertSchema(Sessions);
