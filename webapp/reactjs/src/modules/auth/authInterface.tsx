import {ActionType} from "typesafe-actions";
import * as module  from "@modules/auth/authModule";

export type AuthAction = ActionType<typeof module>;

export interface AuthInterface { 
	accessToken : string
	tokenExpiresTime : string
	isAuthenticated : boolean
	role: string
};