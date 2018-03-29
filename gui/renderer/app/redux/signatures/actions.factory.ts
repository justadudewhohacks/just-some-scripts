import { Dispatch } from 'redux'
import {
  editFunctionAction,
  editFunctionSignatureAction,
  updateReturnValueTypeAction,
  updateReturnValueNameAction,
  updateArgumentNameAction,
  updateArgumentTypeAction,
  addFunctionSignatureAction,
  addFunctionReturnValueAction,
  addFunctionArgumentAction,
  removeFunctionSignatureAction,
  removeFunctionArgumentAction,
  removeFunctionReturnValueAction,
  updateArgumentArrayDepthAction
} from './actionCreators';
import { IAction } from '../reduxUtils';
import { createNewFunctionSignatureAction, makeFunctionArgumentOptionalAction, updateReturnValueArrayDepthAction, updateArgumentDefaultValueAction } from './actionCreators';

export default function() {

  function editFunction(_id: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(editFunctionAction({ _id }))
    }
  }

  function editFunctionSignature(idx: number) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(editFunctionSignatureAction({ idx }))
    }
  }

  function updateReturnValueType(type: string, argName: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(updateReturnValueTypeAction({ type, argName }))
    }
  }

  function updateReturnValueName(name: string, argName: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(updateReturnValueNameAction({ name, argName }))
    }
  }

  function updateArgumentType(type: string, argName: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(updateArgumentTypeAction({ type, argName }))
    }
  }

  function updateArgumentName(name: string, argName: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(updateArgumentNameAction({ name, argName }))
    }
  }

  function addFunctionArgument() {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(addFunctionArgumentAction({}))
    }
  }

  function addFunctionReturnValue() {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(addFunctionReturnValueAction({}))
    }
  }

  function addFunctionSignature() {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(addFunctionSignatureAction({}))
    }
  }

  function removeFunctionArgument(argName: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(removeFunctionArgumentAction({ argName }))
    }
  }

  function removeFunctionReturnValue(argName: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(removeFunctionReturnValueAction({ argName }))
    }
  }

  function removeFunctionSignature(idx: number) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(removeFunctionSignatureAction({ idx }))
    }
  }

  function createNewFunctionSignature(value: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(createNewFunctionSignatureAction({ value }))
    }
  }

  function makeFunctionArgument(argName: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(removeFunctionArgumentAction({ argName }))
    }
  }

  function updateReturnValueArrayDepth(value: string, argName: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      const depth = parseInt(value || '0')
      if (isNaN(depth)) {
        dispatch({
          type: 'ISNAN_FUNCTION_RETURN_VALUE_ARRAY_DEPTH'
        })
        return
      }
      dispatch(updateReturnValueArrayDepthAction({ depth, argName }))
    }
  }

  function updateArgumentArrayDepth(value: string, argName: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      const depth = parseInt(value || '0')
      if (isNaN(depth)) {
        dispatch({
          type: 'ISNAN_FUNCTION_ARGUMENT_ARRAY_DEPTH'
        })
        return
      }
      dispatch(updateArgumentArrayDepthAction({ depth, argName }))
    }
  }

  function updateArgumentDefaultValue(value: string, argName: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(updateArgumentDefaultValueAction({ value, argName }))
    }
  }

  function makeFunctionArgumentOptional(argName: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(makeFunctionArgumentOptionalAction({ argName }))
    }
  }

  return {
    editFunction,
    editFunctionSignature,
    updateReturnValueType,
    updateReturnValueName,
    updateReturnValueArrayDepth,
    updateArgumentType,
    updateArgumentName,
    updateArgumentArrayDepth,
    updateArgumentDefaultValue,
    addFunctionArgument,
    addFunctionReturnValue,
    addFunctionSignature,
    removeFunctionArgument,
    removeFunctionReturnValue,
    removeFunctionSignature,
    createNewFunctionSignature,
    makeFunctionArgumentOptional
  }
}

