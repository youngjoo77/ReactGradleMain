import {ActionType} from "typesafe-actions";
import * as module  from "@modules/theme/themeModule";

export type ThemeAction = ActionType<typeof module>;

export interface ThemeInterface {
  mode: string
};