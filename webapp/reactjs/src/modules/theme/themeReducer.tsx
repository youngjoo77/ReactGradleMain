import {ThemeAction, ThemeInterface} from "@/modules/theme/themeInterface";
import {THEME_MODE} from "@modules/theme/themeModule";
import {createReducer} from "typesafe-actions";
import produce from "immer";

const initialState : ThemeInterface = {
	mode : 'light'
};

const theme = createReducer<ThemeInterface, ThemeAction>(initialState, {
	[THEME_MODE] : (state, action) =>
	produce(state, draft => {
		draft.mode = action.payload.mode;
	})
});

export default theme;