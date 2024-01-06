import { QuizSelect } from "../libs/repo/repoTypes";
import { Step } from "./Step";

export interface Quiz extends QuizSelect {
  steps?: Step[];
}
