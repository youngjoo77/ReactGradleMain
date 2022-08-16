import {ActionType} from "typesafe-actions";
import * as progressModule  from "@modules/progress/progressModule";

export type ProgressAction = ActionType<typeof progressModule>;

export interface ProgressInterace {
  progressOpen : boolean
};