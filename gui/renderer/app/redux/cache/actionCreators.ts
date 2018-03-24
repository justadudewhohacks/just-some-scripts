import { IFunction, IFunctionMetaData } from '@opencv4nodejs-gen/persistence';
import { actionCreator } from '../reduxUtils';

export const fetchFunctionSuccessAction = actionCreator<{ fn: IFunction }>('FETCH_FUNCTION_SUCCESS')
export const fetchClassNamesSuccessAction = actionCreator<{ classNames: string[] }>('FETCH_CLASS_NAMES_SUCCESS')
export const fetchFunctionMetaDataSuccessAction = actionCreator<{ functionMetaDatas: IFunctionMetaData[] }>('FETCH_FUNCTION_META_DATAS_SUCCESS')
