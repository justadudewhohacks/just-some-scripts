import { IFunction } from '../../../../persistence/index';
import { actionCreator } from '../reduxUtils';

export const editFunctionAction = actionCreator<{ _id: string }>('EDIT_FUNCTION')
export const editFunctionSignatureAction = actionCreator<{ idx: number }>('EDIT_FUNCTION_SIGNATURE')
export const fetchFunctionSuccessAction = actionCreator<{ fn: IFunction }>('FETCH_FUNCTION_SUCCESS')

export const updateReturnValueTypeAction = actionCreator<{ type: string, idx: number }>('UPDATE_FUNCTION_RETURN_VALUE_TYPE')
export const updateReturnValueNameAction = actionCreator<{ name: string, idx: number }>('UPDATE_FUNCTION_RETURN_VALUE_NAME')
