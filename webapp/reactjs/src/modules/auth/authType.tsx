import {ActionType} from "typesafe-actions";
import * as authModule  from "@modules/auth/authModule";

export type AuthAction = ActionType<typeof authModule>;

export type Auth = {
	accessToken : string,
	tokenExpiresTime : string
};