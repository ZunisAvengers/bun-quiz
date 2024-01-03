import { quizTable, variantTable, userTable, stepTable } from "./tables";

export type QuizSelect = typeof quizTable.$inferSelect;
export type VariantSelect = typeof variantTable.$inferSelect;
export type UserSelect = typeof userTable.$inferSelect;
export type StepSelect = typeof stepTable.$inferSelect;

export type QuizInsert = typeof quizTable.$inferInsert;
export type VariantInsert = typeof variantTable.$inferInsert;
export type UserInsert = typeof userTable.$inferInsert;
export type StepInsert = typeof stepTable.$inferInsert;
