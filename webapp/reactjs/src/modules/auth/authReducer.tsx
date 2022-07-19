import {AuthAction, AuthType} from "@modules/auth/authType";
import {ADD_ACCESSTOKEN, REMOVE_ACCESSTOKEN, ADD_EXPIRES_ACCESSTOKEN, REMOVE_EXPIRES_ACCESSTOKEN,
IS_AUTHENTICATED, ADD_USER_ROLE} from "@modules/auth/authModule";
import {createReducer} from "typesafe-actions";
import produce from "immer";

const initialState : AuthType = {
	accessToken : "",
	tokenExpiresTime : "",
	isAuthenticated : false,
	role : ""
};

const auth = createReducer<AuthType, AuthAction>(initialState, {
	[ADD_ACCESSTOKEN] : (state, action) =>
	produce(state, draft => {
		draft.accessToken = action.payload.accessToken;
	}),
	[REMOVE_ACCESSTOKEN] : (state, action) =>
	produce(state, draft => {
		draft.accessToken = "";
	}),
	[ADD_EXPIRES_ACCESSTOKEN] : (state, action) =>
	produce(state, draft => {
		draft.tokenExpiresTime = action.payload.tokenExpiresTime;
	}),
	[REMOVE_EXPIRES_ACCESSTOKEN] : (state, action) =>
	produce(state, draft => {
		draft.tokenExpiresTime = "";
	}),
	[IS_AUTHENTICATED] : (state, action) =>
	produce(state, draft => {
		draft.isAuthenticated = action.payload.isAuthenticated;
	}),
	[ADD_USER_ROLE] : (state, action) =>
	produce(state, draft => {
		draft.role = action.payload.role;
	})
});

export default auth;