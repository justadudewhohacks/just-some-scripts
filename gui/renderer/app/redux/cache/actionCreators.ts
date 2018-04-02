import { IFunctionMetaData } from '@opencv4nodejs/entities';

import { FunctionInstance } from '../../classes';
import { actionCreator } from '../reduxUtils';

export const fetchFunctionSuccessAction = actionCreator<{ fn: FunctionInstance }>('FETCH_FUNCTION_SUCCESS')
export const fetchClassNamesSuccessAction = actionCreator<{ classNames: string[] }>('FETCH_CLASS_NAMES_SUCCESS')
export const fetchFunctionMetaDataSuccessAction = actionCreator<{ functionMetaDatas: IFunctionMetaData[] }>('FETCH_FUNCTION_META_DATAS_SUCCESS')
export const unloadFunctionAction = actionCreator<{ uuid: string }>('UNLOAD_FUNCTION')