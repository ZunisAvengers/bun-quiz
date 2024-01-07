import { t } from "elysia";

export const createQuizValidator = (requiredId = true) => {
  const requiredIdValidator = t.Number({ exclusiveMinimum: 0 });
  const idValidator = requiredId
    ? requiredIdValidator
    : t.Optional(requiredIdValidator);

  const variantValidator = t.Object({
    id: idValidator,
    text: t.String(),
    isRight: t.Optional(t.Boolean()),
    stepId: idValidator,
  });

  const stepValidator = t.Object({
    id: idValidator,
    order: t.Optional(t.Number()),
    question: t.String(),
    background: t.Optional(t.String()),
    quizId: idValidator,
    variants: t.Array(variantValidator),
  });

  const quizValidator = t.Object({
    id: idValidator,
    name: t.String(),
    steps: t.Array(stepValidator),
    avatar: t.Optional(t.String()),
    background: t.Optional(t.String()),
  });

  return quizValidator;
};
