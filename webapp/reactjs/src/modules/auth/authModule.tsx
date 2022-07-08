import {deprecated} from "typesafe-actions";

/**
 * createStandardAction
 * 첫번째 인자값 : Action Type
 * 두번째 인자값 :  payload (Action 함수의 파라미터값)
  *세번째 인자값 : Action의 Type (기본적으로 Type을 우선 구현했기 때문에 자동으로 적용됨)
 */
const {createStandardAction} = deprecated;

export const ADD_ACCESSTOKEN = 'auth/ADD_ACCESSTOKEN';
export const REMOVE_ACCESSTOKEN = 'auth/REMOVE_ACCESSTOKEN';
export const ADD_EXPIRES_ACCESSTOKEN = 'auth/ADD_EXPIRES_ACCESSTOKEN';
export const REMOVE_EXPIRES_ACCESSTOKEN = 'auth/REMOVE_EXPIRES_ACCESSTOKEN';
export const IS_AUTHENTICATED = 'auth/IS_AUTHENTICATED';



export const addAccesstoken = createStandardAction(ADD_ACCESSTOKEN)<{
	 accessToken : string
}>();

export const removeAccesstoken = createStandardAction(REMOVE_ACCESSTOKEN)();

export const addExpiresAccesstoken = createStandardAction(ADD_EXPIRES_ACCESSTOKEN)<{
	 tokenExpiresTime : string
}>();

export const removeExpiresAccesstoken = createStandardAction(REMOVE_EXPIRES_ACCESSTOKEN)();

export const isAuthenticated = createStandardAction(IS_AUTHENTICATED)<{
	 isAuthenticated : boolean
}>();