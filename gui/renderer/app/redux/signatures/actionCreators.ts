import { actionCreator } from '../reduxUtils';

export const editFunctionAction = actionCreator<{ fnUuid: string }>('EDIT_FUNCTION')
export const editFunctionSignatureAction = actionCreator<{ sigUuid: string }>('EDIT_FUNCTION_SIGNATURE')

export const updateReturnValueTypeAction = actionCreator<{ type: string, argUuid: string }>('UPDATE_FUNCTION_RETURN_VALUE_TYPE')
export const updateReturnValueNameAction = actionCreator<{ name: string, argUuid: string }>('UPDATE_FUNCTION_RETURN_VALUE_NAME')
export const updateReturnValueArrayDepthAction = actionCreator<{ depth: number, argUuid: string }>('UPDATE_FUNCTION_RETURN_VALUE_ARRAY_DEPTH')
export const updateArgumentTypeAction = actionCreator<{ type: string, argUuid: string }>('UPDATE_FUNCTION_ARGUMENT_TYPE')
export const updateArgumentNameAction = actionCreator<{ name: string, argUuid: string }>('UPDATE_FUNCTION_ARGUMENT_NAME')
export const updateArgumentArrayDepthAction = actionCreator<{ depth: number, argUuid: string }>('UPDATE_FUNCTION_ARGUMENT_ARRAY_DEPTH')
export const updateArgumentDefaultValueAction = actionCreator<{ value: string, argUuid: string }>('UPDATE_FUNCTION_ARGUMENT_DEFAULT_VALUE')

export const makeFunctionArgumentOptionalAction = actionCreator<{ argUuid: string }>('MAKE_FUNCTION_ARGUMENT_OPTIONAL')

export const addFunctionReturnValueAction = actionCreator<{}>('ADD_FUNCTION_RETURN_VALUE')
export const addFunctionArgumentAction = actionCreator<{}>('ADD_FUNCTION_ARGUMENT')
export const addFunctionSignatureAction = actionCreator<{}>('ADD_FUNCTION_SIGNATURE')

export const removeFunctionReturnValueAction = actionCreator<{ argUuid: string }>('REMOVE_FUNCTION_RETURN_VALUE')
export const removeFunctionArgumentAction = actionCreator<{ argUuid: string }>('REMOVE_FUNCTION_ARGUMENT')
export const removeFunctionSignatureAction= actionCreator<{ sigUuid: string }>('REMOVE_FUNCTION_SIGNATURE')

export const createNewFunctionSignatureAction = actionCreator<{ value: string }>('CREATE_NEW_FUNCTION_SIGNATURE')

