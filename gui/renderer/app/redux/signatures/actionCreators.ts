import { IFunction } from '@opencv4nodejs-gen/persistence';
import { actionCreator } from '../reduxUtils';

export const editFunctionAction = actionCreator<{ _id: string, cachedFunctions: IFunction[] }>('EDIT_FUNCTION')
export const editFunctionSignatureAction = actionCreator<{ idx: number }>('EDIT_FUNCTION_SIGNATURE')

export const updateReturnValueTypeAction = actionCreator<{ type: string, argName: string }>('UPDATE_FUNCTION_RETURN_VALUE_TYPE')
export const updateReturnValueNameAction = actionCreator<{ name: string, argName: string }>('UPDATE_FUNCTION_RETURN_VALUE_NAME')
export const updateArgumentTypeAction = actionCreator<{ type: string, argName: string }>('UPDATE_FUNCTION_ARGUMENT_TYPE')
export const updateArgumentNameAction = actionCreator<{ name: string, argName: string }>('UPDATE_FUNCTION_ARGUMENT_NAME')

export const addFunctionReturnValueAction = actionCreator<{}>('ADD_FUNCTION_RETURN_VALUE')
export const addFunctionArgumentAction = actionCreator<{}>('ADD_FUNCTION_ARGUMENT')
export const addFunctionSignatureAction = actionCreator<{}>('ADD_FUNCTION_SIGNATURE')
export const removeFunctionReturnValueAction = actionCreator<{ argName: string }>('REMOVE_FUNCTION_RETURN_VALUE')
export const removeFunctionArgumentAction = actionCreator<{argName: string }>('REMOVE_FUNCTION_ARGUMENT')
export const removeFunctionSignatureAction= actionCreator<{argName: string }>('REMOVE_FUNCTION_SIGNATURE')
