import { Dispatch } from 'redux';

import { IAction } from '../reduxUtils';
import {
  addFunctionArgumentAction,
  addFunctionReturnValueAction,
  addFunctionSignatureAction,
  createNewFunctionSignatureAction,
  editFunctionAction,
  editFunctionSignatureAction,
  makeFunctionArgumentOptionalAction,
  removeFunctionArgumentAction,
  removeFunctionReturnValueAction,
  removeFunctionSignatureAction,
  updateArgumentArrayDepthAction,
  updateArgumentDefaultValueAction,
  updateArgumentNameAction,
  updateArgumentTypeAction,
  updateReturnValueArrayDepthAction,
  updateReturnValueNameAction,
  updateReturnValueTypeAction,
} from './actionCreators';

export default function() {

  function editFunction(fnUuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(editFunctionAction({ fnUuid }))
    }
  }

  function editFunctionSignature(sigUuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(editFunctionSignatureAction({ sigUuid }))
    }
  }

  function updateReturnValueType(type: string, argUuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(updateReturnValueTypeAction({ type, argUuid }))
    }
  }

  function updateReturnValueName(name: string, argUuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(updateReturnValueNameAction({ name, argUuid }))
    }
  }

  function updateArgumentType(type: string, argUuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(updateArgumentTypeAction({ type, argUuid }))
    }
  }

  function updateArgumentName(name: string, argUuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(updateArgumentNameAction({ name, argUuid }))
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

  function removeFunctionArgument(argUuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(removeFunctionArgumentAction({ argUuid }))
    }
  }

  function removeFunctionReturnValue(argUuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(removeFunctionReturnValueAction({ argUuid }))
    }
  }

  function removeFunctionSignature(sigUuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(removeFunctionSignatureAction({ sigUuid }))
    }
  }

  function createNewFunctionSignature(value: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(createNewFunctionSignatureAction({ value }))
    }
  }

  function updateReturnValueArrayDepth(value: string, argUuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      const depth = parseInt(value || '0')
      if (isNaN(depth)) {
        dispatch({
          type: 'ISNAN_FUNCTION_RETURN_VALUE_ARRAY_DEPTH'
        })
        return
      }
      dispatch(updateReturnValueArrayDepthAction({ depth, argUuid }))
    }
  }

  function updateArgumentArrayDepth(value: string, argUuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      const depth = parseInt(value || '0')
      if (isNaN(depth)) {
        dispatch({
          type: 'ISNAN_FUNCTION_ARGUMENT_ARRAY_DEPTH'
        })
        return
      }
      dispatch(updateArgumentArrayDepthAction({ depth, argUuid }))
    }
  }

  function updateArgumentDefaultValue(value: string, argUuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(updateArgumentDefaultValueAction({ value, argUuid }))
    }
  }

  function makeFunctionArgumentOptional(argUuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(makeFunctionArgumentOptionalAction({ argUuid }))
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

