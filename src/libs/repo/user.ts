import { eq, sql } from "drizzle-orm";
import { db } from ".";
import { userTable } from "./tables";

const queryUserByLogin = db
  .select({
    id: userTable.id,
    passwordHash: userTable.passwordHash,
    login: userTable.login,
  })
  .from(userTable)
  .where(eq(userTable.login, sql.placeholder("login")))
  .prepare();

export const insertUser = async (login: string, passwordHash: string) => {
  const [res] = await db
    .insert(userTable)
    .values({ login, passwordHash })
    .returning({ id: userTable.id });
  return res;
};

export const getUserByLogin = async (login: string) => {
  const [user] = queryUserByLogin.all({ login });
  return user;
};
