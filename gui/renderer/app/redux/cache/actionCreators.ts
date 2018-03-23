import { IFunction } from '@opencv4nodejs-gen/persistence';
import { actionCreator } from '../reduxUtils';

export const fetchFunctionSuccessAction = actionCreator<{ fn: IFunction }>('FETCH_FUNCTION_SUCCESS')
export const fetchClassNamesSuccessAction = actionCreator<{ classNames: string[] }>('FETCH_CLASS_NAMES_SUCCESS')
