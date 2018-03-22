import { Dispatch } from 'redux'
import { ISignaturesService } from './types';
import {
  fetchFunctionSuccessAction,
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

export default function(service: ISignaturesService) {

  function fetchFunction(name: string) {
    return async function(dispatch: Dispatch<IAction<any>>) {
      const [first = '', className = ''] = name.split('.').map(s => s.trim())
      const owner = `${(first[0] || '').toUpperCase()}${first.substr(1)}`

      if (!owner || !className) {
        dispatch({
          type: 'FETCH_FUNCTION_INVALID_INPUT',
          payload: { owner, className }
        })
        return
      }

      dispatch({
        type: 'FETCHING_FUNCTION',
        payload: { owner, className }
      })

      try {
        const fn = await service.fetchFunction({ owner, className })
        if (!fn) {
          dispatch({
            type: 'FETCH_FUNCTION_NOT_FOUND',
            payload: { owner, className }
          })
          return
        }

        dispatch(fetchFunctionSuccessAction({ fn }))
      } catch (error) {
        dispatch({
          type: 'FETCH_FUNCTION_ERROR',
          payload: { error }
        })
      }
    }
  }

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

  function removeFunctionSignature(argName: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      dispatch(removeFunctionSignatureAction({ argName }))
    }
  }

  return {
    fetchFunction,
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

