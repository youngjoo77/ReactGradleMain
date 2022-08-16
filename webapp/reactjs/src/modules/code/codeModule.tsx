import { deprecated } from "typesafe-actions";
import { CodeInterface } from '@modules/code/codeInterface'
/**
 * createStandardAction
 * 첫번째 인자값 : Action Type
 * 두번째 인자값 :  payload (Action 함수의 파라미터값)
  *세번째 인자값 : Action의 Type (기본적으로 Type을 우선 구현했기 때문에 자동으로 적용됨)
 */
const { createStandardAction } = deprecated;

export const ADD_CODE_LIST = 'code/ADD_CODE_LIST';

export const addCodeList = createStandardAction(ADD_CODE_LIST)<{
    codeList: Array<CodeInterface>
}>();

