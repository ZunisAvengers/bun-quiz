import { ElysiaApp } from "..";
import { ApiError } from "../libs";
import { UserInfoJWT } from "../types";

export interface HandleUserResult {
  user: UserInfoJWT;
}

type ElysiaAppDeriveParams = Parameters<Parameters<ElysiaApp["derive"]>[0]>[0];

export const handleUser = async ({
  jwt,
  cookie: { auth },
}: ElysiaAppDeriveParams): Promise<HandleUserResult> => {
  if (!auth) throw new ApiError("Unauthorized");
  const user: UserInfoJWT = (await jwt.verify(auth)) as any;
  if (!user) throw new ApiError("Unauthorized");
  return { user };
};
