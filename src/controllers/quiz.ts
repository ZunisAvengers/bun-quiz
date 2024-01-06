import { t } from "elysia";
import { ElysiaApp } from "..";
import { handleUser, createQuizValidator } from "../models";

export const createQuizController = (app: ElysiaApp) =>
  app
    .get("/", () => "hellow")
    .get("/:id", ({ params }) => "message " + params.id, {
      params: t.Object({ id: t.Numeric() }),
    })
    .derive(handleUser)
    .post("/", ({ user, body: quiz }) => {

    }, {
      body: createQuizValidator(false),
    });
