import {deprecated} from "typesafe-actions";
import {MenuList} from "@modules/menu/menuType"
/**
 * createStandardAction
 * 첫번째 인자값 : Action Type
 * 두번째 인자값 :  payload (Action 함수의 파라미터값)
  *세번째 인자값 : Action의 Type (기본적으로 Type을 우선 구현했기 때문에 자동으로 적용됨)
 */
const {createStandardAction} = deprecated;

export const ADD_MENU_LIST = 'menu/ADD_MENU_LIST';
export const REMOVE_MENU_LIST = 'menu/REMOVE_MENU_LIST';

export const addMenuList = createStandardAction(ADD_MENU_LIST)<MenuList>();
export const removeMenuList = createStandardAction(REMOVE_MENU_LIST)();