import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const url = import.meta.env.DB_URL;
const auth = import.meta.env.DB_AUTH;

if (!url || !auth) throw new Error("env must be exist");

const sqlite = createClient({ url, authToken: auth });
export const db = drizzle(sqlite);
