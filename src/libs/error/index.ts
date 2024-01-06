import { HTTPStatusName } from "elysia/dist/utils";

export class ApiError extends Error {
  constructor(
    public readonly status: number | HTTPStatusName,
    ...params: ConstructorParameters<ErrorConstructor>
  ) {
    super(...params);
  }
}
