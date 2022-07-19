import {ActionType} from "typesafe-actions";
import * as authModule  from "@modules/auth/authModule";

export type AuthAction = ActionType<typeof authModule>;

export interface AuthType {
	accessToken : string
	tokenExpiresTime : string
	isAuthenticated : boolean
	role : string
};