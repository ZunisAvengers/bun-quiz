import { StepSelect } from "../libs/repo/repoTypes";
import { Variant } from "./Variant";

export interface Step extends StepSelect {
  variants: Variant[];
}
