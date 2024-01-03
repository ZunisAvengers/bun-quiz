import { SQLiteSelect } from "drizzle-orm/sqlite-core";

export const withPagination = <T extends SQLiteSelect>(
  query: T,
  page: number,
  pageSize: number = 20
) => {
  return query.limit(page).offset(pageSize);
};
