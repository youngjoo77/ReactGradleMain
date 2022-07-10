import {AuthAction, AuthType} from "@modules/auth/authType";
import {ADD_ACCESSTOKEN, REMOVE_ACCESSTOKEN, ADD_EXPIRES_ACCESSTOKEN, REMOVE_EXPIRES_ACCESSTOKEN,
IS_AUTHENTICATED} from "@modules/auth/authModule";
import {createReducer} from "typesafe-actions";
import produce from "immer";

const initialState : AuthType = {
	accessToken : "",
	tokenExpiresTime : "",
	isAuthenticated : false
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
	})
});

export default auth;