import { IFunction } from '../../../../persistence/index';
import { actionCreator } from '../reduxUtils';

export const editFunctionAction = actionCreator<{ _id: string }>('EDIT_FUNCTION')
export const fetchFunctionSuccessAction = actionCreator<{ fn: IFunction }>('FETCH_FUNCTION_SUCCESS')
