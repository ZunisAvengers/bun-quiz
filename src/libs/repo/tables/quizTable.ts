import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { userTable } from "./userTable";

export const quizTable = sqliteTable("quiz", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  background: text("background"),
  avatar: text("avatar"),
  createAt: integer("create_at", { mode: "timestamp" }).default(
    sql`strftime('%s', 'now')`
  ),
  author: integer("author").references(() => userTable.id),
});
