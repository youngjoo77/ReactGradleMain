import {combineReducers} from 'redux';
import auth from "@modules/auth/authReducer";
import {Auth} from "@modules/auth/authType";
import menu from "@modules/menu/menuReducer"
import {MenuList} from "@modules/menu/menuType";

export type RootState = {
	auth : Auth,
	menu : MenuList
}

const rootReducer = combineReducers({
	auth,
	menu
});

export default rootReducer;
