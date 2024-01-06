import { t } from "elysia";
import { loginUser, regUser } from "../libs";
import { ElysiaApp } from "..";
import { handleUser } from "../models";

export const createAuthController = (app: ElysiaApp) =>
  app
    .guard(
      {
        body: t.Object({
          login: t.String({ minLength: 6 }),
          password: t.String({ minLength: 6 }),
        }),
      },
      (app) =>
        app
          .post("/reg", ({ body: { login, password } }) =>
            regUser(login, password)
          )
          .post(
            "/login",
            async ({ jwt, setCookie, body: { login, password } }) => {
              const userInfo = await loginUser(login, password);
              if (!userInfo) return false;
              setCookie("auth", await jwt.sign(userInfo), {
                httpOnly: true,
                maxAge: 7 * 86400,
              });
            }
          )
    )
    .derive(handleUser)
    .post("/logout", ({ removeCookie }) => {
      removeCookie("auth");
      return true;
    });
