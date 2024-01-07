import { NotFoundError } from "elysia";
import { getById, getPagination, insertQuiz } from "../repo/quiz";

export const createQuiz = insertQuiz;
export const getQuizById = async (id: number) => {
  const quiz = await getById(id);
  if (!quiz) throw new NotFoundError();
  return quiz;
};
export const getQuizPagination = getPagination;
