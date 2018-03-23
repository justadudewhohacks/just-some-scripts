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
  removeFunctionReturnValueAction
} from './actionCreators';
import { IAction } from '../reduxUtils';
import { RootState } from '../rootReducer';

export default function() {

  function editFunction(_id: string) {
    return function(dispatch: Dispatch<IAction<any>>, getState: () => RootState) {
      dispatch(editFunctionAction({ _id, cachedFunctions: getState().cache.functions.slice() }))
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

  function removeFunctionSignature(argName: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(removeFunctionSignatureAction({ argName }))
    }
  }

  return {
    editFunction,
    editFunctionSignature,
    updateReturnValueType,
    updateReturnValueName,
    updateArgumentType,
    updateArgumentName,
    addFunctionArgument,
    addFunctionReturnValue,
    addFunctionSignature,
    removeFunctionArgument,
    removeFunctionReturnValue,
    removeFunctionSignature
  }
}

