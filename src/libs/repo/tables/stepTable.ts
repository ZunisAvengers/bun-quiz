import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { quizTable } from "./quizTable";

export const stepTable = sqliteTable("step", {
  id: integer("id").primaryKey(),
  order: integer("order").notNull(),
  question: text("question"),
  background: text("background"),
  quizId: integer("quiz_id")
    .notNull()
    .references(() => quizTable.id, { onDelete: "cascade" }),
});
