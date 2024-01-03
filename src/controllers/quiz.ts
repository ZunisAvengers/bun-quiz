import Elysia, { t } from "elysia";

export const quizController = new Elysia({ prefix: "/api/quiz" })
  .get("/", () => "hellow")
  .get("/:id", ({ params }) => params.id, {
    params: t.Object({ id: t.Number() }),
  });
