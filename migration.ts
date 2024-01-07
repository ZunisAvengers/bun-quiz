import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { db } from "./src/libs/repo";

migrate(db, { migrationsFolder: "./drizzle" });