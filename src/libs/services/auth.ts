import { NotFoundError } from "elysia";
import { UserInfoJWT } from "../../types";
import { getUserByLogin, insertUser } from "../repo/user";
import { ApiError } from "../error";

export const regUser = async (login: string, password: string) => {
  {
    const user = await getUserByLogin(login);
    if (user)
      throw new ApiError("Bad Request", "A user with this login exists");
  }
  const passwordHash = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 2,
  });

  return await insertUser(login, passwordHash);
};

export const loginUser = async (login: string, password: string) => {
  const user = await getUserByLogin(login);
  if (!user) throw new NotFoundError();

  const { passwordHash, ...userInfo } = user;

  const isMatch = await Bun.password.verify(password, passwordHash);
  if (!isMatch) throw new NotFoundError();

  return userInfo satisfies UserInfoJWT;
};
