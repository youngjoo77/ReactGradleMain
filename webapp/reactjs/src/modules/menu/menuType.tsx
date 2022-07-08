import {ActionType} from "typesafe-actions";
import * as menuModule  from "@modules/menu/menuModule";

export type MenuAction = ActionType<typeof menuModule>;

export interface MenuType {
  key : string
  title: string
  show: boolean
//  children: React.ReactElement
};

export interface MenuListType {
  menuItems: MenuType[];
}