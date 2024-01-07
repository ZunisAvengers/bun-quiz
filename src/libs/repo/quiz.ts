import { count, eq, sql } from "drizzle-orm";
import { db } from ".";
import { Quiz, Step } from "../../types";
import {
  InsertVariantTable,
  quizTable,
  stepTable,
  variantTable,
} from "./tables";
import { withPagination, withSearch } from "./tools";

const queryQuzeById = db
  .select()
  .from(quizTable)
  .where(eq(quizTable.id, sql.placeholder("id")))
  .innerJoin(stepTable, eq(quizTable.id, stepTable.quizId))
  .innerJoin(variantTable, eq(stepTable.id, variantTable.stepId))
  .orderBy(stepTable.order)
  .prepare();

export const insertQuiz = (quiz: Quiz, userId?: number) =>
  db.transaction(async ({ insert }) => {
    const [{ quizId }] = await insert(quizTable)
      .values({ ...quiz, author: userId })
      .returning({ quizId: quizTable.id });

    if (quiz.steps) await insertSteps(quiz.steps, quizId);

    return true;
  });

export const getById = async (id: number) => {
  const result = queryQuzeById.all({ id });

  if (!result[0]?.quiz) return null;

  const stepDict: Record<number, Step> = {};

  for (const { step, variant } of result) {
    if (!step || !variant) continue;
    if (!(step.id in stepDict)) stepDict[step.id] = { ...step, variants: [] };
    stepDict[step.id].variants.push(variant);
  }

  return { ...result[0].quiz, steps: Object.values(stepDict) } satisfies Quiz;
};

export const getPagination = async (page: number = 1, search?: string) =>
  db.transaction(async ({ select }) => {
    const itemsQuery = withSearch(
      select().from(quizTable).$dynamic(),
      [quizTable.name],
      search
    );
    const countQuery = withSearch(
      select({ value: count() }).from(quizTable).$dynamic(),
      [quizTable.name],
      search
    );
    const paginationQuery = withPagination(itemsQuery, page);

    const [[{ value: countValue }], items] = await Promise.all([
      countQuery,
      paginationQuery,
    ]);
    return {
      count: countValue,
      items,
    };
  });

const insertSteps = (steps: Step[], quizId: number) =>
  db.transaction(async ({ insert }) => {
    const insertSteps = steps.map(({ background, question }, order) => ({
      order,
      background,
      question,
      quizId,
    }));

    const stepReturn = await insert(stepTable)
      .values(insertSteps)
      .returning({ stepId: stepTable.id });

    const insertVariants = steps.reduce<InsertVariantTable[]>(
      (acc, { variants }, index) => {
        const stepId = stepReturn[index]?.stepId;
        if (!variants || !stepId) return acc;

        const insertVariants = variants.map(({ text }) => ({ text, stepId }));
        return acc.concat(insertVariants);
      },
      []
    );

    if (insertVariants.length)
      await insert(variantTable).values(insertVariants);

    return true;
  });
