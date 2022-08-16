import { CodeAction, CodeListInterface } from "@/modules/code/codeInterface";
import { ADD_CODE_LIST } from "@modules/code/codeModule";
import { createReducer } from "typesafe-actions";
import produce from "immer";

const initialState: CodeListInterface = {
	codeList: []
}

// draft: 기존 state, action : 새로운 state
const codeList = createReducer<CodeListInterface, CodeAction>(initialState, {
	[ADD_CODE_LIST]: (state, action) =>
		produce(state, (draft) => {
			draft.codeList = action.payload.codeList;
		})
});

export default codeList;