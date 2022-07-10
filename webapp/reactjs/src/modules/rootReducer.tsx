import {combineReducers} from 'redux';
import auth from "@modules/auth/authReducer";
import {AuthType} from "@modules/auth/authType";
import menu from "@modules/menu/menuReducer"
import {MenuListType} from "@modules/menu/menuType";
import progress from "@modules/progress/progressReducer"
import {ProgressType} from "@modules/progress/progressType";

export type RootState = {
	auth : AuthType,
	menu : MenuListType,
	progress : ProgressType
}

const rootReducer = combineReducers({
	auth,
	menu,
	progress
});

export default rootReducer;
