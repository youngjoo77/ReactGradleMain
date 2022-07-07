import {MenuAction, Menu, MenuList} from "@modules/menu/menuType";
import {ADD_MENU_LIST, REMOVE_MENU_LIST} from "@modules/menu/menuModule";
import {createReducer} from "typesafe-actions";
import produce from "immer";

const initialState : MenuList = {
	menuItems : [],
};

const auth = createReducer<MenuList, MenuAction>(initialState, {
	[ADD_MENU_LIST] : (state, action) =>
	produce(state, draft => {
		draft.menuItems = action.payload.menuItems;
	}),
	[REMOVE_MENU_LIST] : (state, action) =>
	produce(state, draft => {
		draft.menuItems = [];
	})
});

export default auth;