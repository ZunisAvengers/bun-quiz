import { Elysia } from "elysia";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import { createAuthController, createQuizController } from "./controllers";
import { ApiError } from "./libs";

const secret = import.meta.env.JWT_SECRET ?? "test";
const port = Number(import.meta.env.PORT) || 3000;

if (!secret) throw new Error("env must be exist");

export const app = new Elysia()
  .use(jwt({ name: "jwt", secret }))
  .use(cookie())
  .error({ ApiError })
  .onError(({ error, code, set }) => {
    if (code === "ApiError") {
      set.status = error.status;
      return error;
    }
  });

export type ElysiaApp = typeof app;

app
  // @ts-ignore
  .group("/api/auth", createAuthController)
  // @ts-ignore
  .group("/api/quiz", createQuizController)
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
