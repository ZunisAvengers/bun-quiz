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
  .leftJoin(stepTable, eq(quizTable.id, stepTable.quizId))
  .leftJoin(variantTable, eq(stepTable.id, variantTable.stepId))
  .orderBy(stepTable.order)
  .prepare();

export const insertQuiz = async (quiz: Quiz) => {
  const [{ quizId }] = await db
    .insert(quizTable)
    .values(quiz)
    .returning({ quizId: quizTable.id });

  if (quiz.steps) return await insertSteps(quiz.steps, quizId);

  return true;
};

export const getById = async (id: number) => {
  const result = queryQuzeById.all({ id });

  const stepDict: Record<number, Step> = {};

  for (const { step, variant } of result) {
    if (!step || !variant) continue;
    if (!stepDict[step.id]) stepDict[step.id] = { ...step, variants: [] };
    stepDict[step.id].variants.push(variant);
  }

  return { ...result[0].quiz, steps: Object.values(stepDict) } satisfies Quiz;
};

export const getPagination = async (page: number = 1, search?: string) => {
  const itemsQuery = withSearch(
    db.select().from(quizTable).$dynamic(),
    [quizTable.name],
    search
  );
  const countQuery = withSearch(
    db.select({ value: count() }).from(quizTable).$dynamic(),
    [quizTable.name],
    search
  );
  const paginationQuery = withPagination(itemsQuery, page);

  const [[{ value }], items] = await Promise.all([countQuery, paginationQuery]);
  return {
    count: value,
    items,
  };
};

const insertSteps = async (steps: Step[], quizId: number) => {
  const insertSteps = steps.map(({ background, question }, order) => ({
    order,
    background,
    question,
    quizId,
  }));

  const stepReturn = await db
    .insert(stepTable)
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
    await db.insert(variantTable).values(insertVariants);

  return true;
};
