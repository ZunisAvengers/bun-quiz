import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { stepTable } from "./stepTable";

export const variantTable = sqliteTable("variant", {
  id: integer("id").primaryKey(),
  text: text("variant_text").notNull(),
  isRight: integer("is_rigth", { mode: "boolean" }).default(false),
  stepId: integer("step_id").references(() => stepTable.id, {
    onDelete: "cascade",
  }),
});
export type InsertVariantTable = typeof variantTable.$inferInsert;
