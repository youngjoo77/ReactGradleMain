import {ProgressAction, ProgressType} from "@modules/progress/progressType";
import {TOGGLE_PROGRESS} from "@modules/progress/progressModule";
import {createReducer} from "typesafe-actions";
import produce from "immer";

const initialState : ProgressType = {
	progressOpen : false
};

const progressReducer = createReducer<ProgressType, ProgressAction>(initialState, {
	[TOGGLE_PROGRESS] : (state, action) =>
	produce(state, draft => {
		draft.progressOpen = action.payload.progressOpen;
	})
});

export default progressReducer;