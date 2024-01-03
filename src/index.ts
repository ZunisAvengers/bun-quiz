import { Elysia } from "elysia";
import { authController, quizController } from "./controllers";

export const app = new Elysia()
  .use(authController)
  .use(quizController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
