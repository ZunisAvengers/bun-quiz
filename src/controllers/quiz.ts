import { t } from "elysia";
import { ElysiaApp } from "..";
import { handleUser, createQuizValidator } from "../models";
import { createQuiz, getQuizById, getQuizPagination } from "../libs";
import { Quiz } from "../types";

export const createQuizController = (app: ElysiaApp) =>
  app
    .get(
      "/",
      ({ query: { page, search } }) => getQuizPagination(page, search),
      {
        query: t.Object({
          search: t.Optional(t.String()),
          page: t.Optional(t.Numeric({ default: 1 })),
        }),
      }
    )
    .get("/:id", ({ params: { id } }) => getQuizById(id), {
      params: t.Object({ id: t.Numeric() }),
    })
    .derive(handleUser)
    .post("/", ({ user: { id }, body }) => createQuiz(body as Quiz, id), {
      body: createQuizValidator(false),
    });
