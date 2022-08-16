import { ActionType } from "typesafe-actions";
import * as module from "@modules/code/codeModule";

export type CodeAction = ActionType<typeof module>;

interface CodeDetailInterface {
	cdNbr: string
	cd: string
	cdNm: string
}

export interface CodeInterface {
	cdNbr: string
	cdNbrNm: string
	children: Array<CodeDetailInterface>
};

export interface CodeListInterface {
	codeList: Array<CodeInterface>
}