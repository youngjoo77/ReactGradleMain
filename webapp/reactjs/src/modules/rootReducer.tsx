import { combineReducers } from 'redux';
import auth from "@modules/auth/authReducer";
import { AuthInterface } from "@/modules/auth/authInterface";

import progress from "@modules/progress/progressReducer"
import { ProgressInterace } from "@/modules/progress/progressInterface";

import theme from "@modules/theme/themeReducer"
import { ThemeInterface } from "@/modules/theme/themeInterface";

import codeList from "@modules/code/codeReducer"
import { CodeListInterface } from "@/modules/code/codeInterface";

export type RootState = {
	auth: AuthInterface,
	progress: ProgressInterace,
	theme: ThemeInterface,
	codeList: CodeListInterface,
}

/**
 * @param {Object} - key/value of reducer functions 
 */
const rootReducer = (asyncReducers = {}) => combineReducers({
	auth,
	progress,
	theme,
	codeList,
	...asyncReducers
});

export default rootReducer;