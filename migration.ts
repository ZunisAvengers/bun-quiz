import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "./src/libs/repo";

migrate(db, { migrationsFolder: "./drizzle" });