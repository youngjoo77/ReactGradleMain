import {MenuAction, MenuListType} from "@modules/menu/menuType";
import {ADD_MENU_LIST, REMOVE_MENU_LIST} from "@modules/menu/menuModule";
import {createReducer} from "typesafe-actions";
import produce from "immer";

const initialState : MenuListType = {
	menuItems : [],
};

const menuReducer = createReducer<MenuListType, MenuAction>(initialState, {
	[ADD_MENU_LIST] : (state, action) =>
	produce(state, draft => {
		draft.menuItems = action.payload.menuItems;
	}),
	[REMOVE_MENU_LIST] : (state, action) =>
	produce(state, draft => {
		draft.menuItems = [];
	})
});

export default menuReducer;