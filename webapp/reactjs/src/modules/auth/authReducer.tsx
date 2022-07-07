import {AuthAction, Auth} from "@modules/auth/authType";
import {ADD_ACCESSTOKEN, REMOVE_ACCESSTOKEN, ADD_EXPIRES_ACCESSTOKEN, REMOVE_EXPIRES_ACCESSTOKEN} from "@modules/auth/authModule";
import {createReducer} from "typesafe-actions";
import produce from "immer";

const initialState : Auth = {
	accessToken : "",
	tokenExpiresTime : ""
};

const auth = createReducer<Auth, AuthAction>(initialState, {
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
	})
});

export default auth;