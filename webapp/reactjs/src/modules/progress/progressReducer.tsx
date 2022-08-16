import {ProgressAction, ProgressInterace} from "@/modules/progress/progressInterface";
import {TOGGLE_PROGRESS} from "@modules/progress/progressModule";
import {createReducer} from "typesafe-actions";
import produce from "immer";

const initialState : ProgressInterace = {
	progressOpen : false
};

const progress = createReducer<ProgressInterace, ProgressAction>(initialState, {
	[TOGGLE_PROGRESS] : (state, action) =>
	produce(state, draft => {
		draft.progressOpen = action.payload.progressOpen;
	})
});

export default progress;