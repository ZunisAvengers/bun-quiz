import { SQLiteSelect } from "drizzle-orm/sqlite-core";
import { Column, like } from "drizzle-orm";

export const withSearch = <T extends SQLiteSelect>(
  query: T,
  searchCols: Column[],
  search?: string
) => {
  if (!search?.trim()) return query;
  const whereConditions = searchCols.map((col) => like(col, `${search}%`));
  // @ts-ignore
  return query.where(...whereConditions);
};
