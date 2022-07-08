import {combineReducers} from 'redux';
import authReducer from "@modules/auth/authReducer";
import {AuthType} from "@modules/auth/authType";
import menuReducer from "@modules/menu/menuReducer"
import {MenuListType} from "@modules/menu/menuType";
import progressReducer from "@modules/progress/progressReducer"
import {ProgressType} from "@modules/progress/progressType";

export type RootState = {
	auth : AuthType,
	menu : MenuListType,
	progress : ProgressType
}

const rootReducer = combineReducers({
	authReducer,
	menuReducer,
	progressReducer
});

export default rootReducer;
