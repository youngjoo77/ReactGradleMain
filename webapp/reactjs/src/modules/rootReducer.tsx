import {combineReducers} from 'redux';
import auth from "@modules/auth/authReducer";
import {Auth} from "@modules/auth/authType";

export type RootState = {
	auth : Auth
}

const rootReducer = combineReducers({
	auth
});

export default rootReducer;
