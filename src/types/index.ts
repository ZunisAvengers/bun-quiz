import { QuizSelect, StepSelect, VariantSelect } from "../libs/repo/repoTypes";

export interface Quiz extends QuizSelect {
  steps?: Step[];
}

export interface Step extends StepSelect {
  variants: Variant[];
}
export interface Variant extends VariantSelect {}
