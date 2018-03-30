import { Argument, Function, OptionalArgument, Signature } from '@opencv4nodejs-gen/entities';

import { hasFnIdPredicate } from '../../commons/hasFnIdPredicate';
import { fetchFunctionSuccessAction, unloadFunctionAction } from '../cache/actionCreators';
import { insertItem, removeItem, replaceItem } from '../immutibilityUtils';
import { IAction, isType } from '../reduxUtils';
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
  updateArgumentNameAction,
  updateArgumentTypeAction,
  updateReturnValueArrayDepthAction,
  updateReturnValueNameAction,
  updateReturnValueTypeAction,
} from './actionCreators';
import {
  findArgumentByName,
  getCurrentlyEditedFunctionContext,
  getCurrentlyEditedFunctionSignatureContext,
} from './commons';
import { reduceArgumentAdd } from './reduceArgumentAdd';
import { reduceArgumentChange } from './reduceArgumentChange';
import { ArgsArrayName, State } from './types';

const INITIAL_STATE: State = {
  editedFunctions: [],
  currentlyEditing: { uuid: null, currentSignatureIdx: 0 }
}

export default function(state = INITIAL_STATE, action: IAction<any>) : State {

  if (isType(action, fetchFunctionSuccessAction)) {

    const { fn } = action.payload
    const idx = state.editedFunctions.findIndex(hasFnIdPredicate(fn.uuid))

    if (idx !== -1) {
      return { ...state, editedFunctions: replaceItem<Function>(state.editedFunctions, fn, idx) }
    }
    return {
      ...state,
      editedFunctions: state.editedFunctions.concat(fn)
    }

  } else if (isType(action, editFunctionAction)) {

    const { uuid } = action.payload

    if (!state.editedFunctions.some(hasFnIdPredicate(uuid))) {
      return {
        ...state,
        currentlyEditing: { uuid, currentSignatureIdx: 0 }
      }
    }
    return { ...state, currentlyEditing: { ...state.currentlyEditing, uuid } }

  } else if (isType(action, editFunctionSignatureAction)) {

    return {
      ...state,
      currentlyEditing: { ...state.currentlyEditing, currentSignatureIdx: action.payload.idx }
    }

  } else if (isType(action, updateReturnValueTypeAction)) {

    const { type, argName } = action.payload

    return reduceArgumentChange(
      state,
      [ArgsArrayName.returnValues],
      argName,
      (argsArray, argsArrayIdx, arg) => replaceItem<Argument>(argsArray, { ...arg, type }, argsArrayIdx)
    )

  } else if (isType(action, updateReturnValueNameAction)) {

    const { name, argName } = action.payload

    return reduceArgumentChange(
      state,
      [ArgsArrayName.returnValues],
      argName,
      (argsArray, argsArrayIdx, arg) => replaceItem<Argument>(argsArray, { ...arg, name }, argsArrayIdx)
    )

  } else if (isType(action, updateArgumentTypeAction)) {

    const { type, argName } = action.payload

    return reduceArgumentChange(
      state,
      [ArgsArrayName.requiredArgs, ArgsArrayName.optionalArgs],
      argName,
      (argsArray, argsArrayIdx, arg) => replaceItem<Argument>(argsArray, { ...arg, type }, argsArrayIdx)
    )

  } else if (isType(action, updateArgumentNameAction)) {

    const { name, argName } = action.payload

    return reduceArgumentChange(
      state,
      [ArgsArrayName.requiredArgs, ArgsArrayName.optionalArgs],
      argName,
      (argsArray, argsArrayIdx, arg) => replaceItem<Argument>(argsArray, { ...arg, name }, argsArrayIdx)
    )

  } else if (isType(action, updateReturnValueArrayDepthAction)) {

    const { depth, argName } = action.payload

    return reduceArgumentChange(
      state,
      [ArgsArrayName.returnValues],
      argName,
      (argsArray, argsArrayIdx, arg) => replaceItem<OptionalArgument>(argsArray as any, { ...(arg as any), arrayDepth: depth }, argsArrayIdx)
    )

  } else if (isType(action, updateArgumentArrayDepthAction)) {

    const { depth, argName } = action.payload

    return reduceArgumentChange(
      state,
      [ArgsArrayName.requiredArgs, ArgsArrayName.optionalArgs],
      argName,
      (argsArray, argsArrayIdx, arg) => replaceItem<OptionalArgument>(argsArray as any, { ...(arg as any), arrayDepth: depth }, argsArrayIdx)
    )

  } else if (isType(action, removeFunctionReturnValueAction)) {

    return reduceArgumentChange(
      state,
      [ArgsArrayName.returnValues],
      action.payload.argName,
      (argsArray, argsArrayIdx) => removeItem<Argument>(argsArray, argsArrayIdx)
    )

  } else if (isType(action, removeFunctionArgumentAction)) {

    return reduceArgumentChange(
      state,
      [ArgsArrayName.requiredArgs, ArgsArrayName.optionalArgs],
      action.payload.argName,
      (argsArray, argsArrayIdx) => removeItem<Argument>(argsArray, argsArrayIdx)
    )

  } else if (isType(action, addFunctionReturnValueAction)) {

    return reduceArgumentAdd(
      state,
      ArgsArrayName.returnValues,
      argsArray => insertItem<Argument>(argsArray, new Argument(), argsArray.length)
    )

  } else if (isType(action, addFunctionArgumentAction)) {

    return reduceArgumentAdd(
      state,
      ArgsArrayName.requiredArgs,
      argsArray => insertItem<Argument>(argsArray, new Argument(), argsArray.length)
    )

  } else if (isType(action, createNewFunctionSignatureAction)) {

    return {
      ...state,
      editedFunctions: state.editedFunctions.concat(new Function())
    }

  } else if (isType(action, unloadFunctionAction)) {

    const { uuid } = action.payload

    const idx = state.editedFunctions.findIndex(hasFnIdPredicate(uuid))
    if (idx !== -1) {
      return { ...state, editedFunctions: removeItem<Function>(state.editedFunctions, idx) }
    }

    return state

  } else if (isType(action, addFunctionSignatureAction)) {

    const editContext = getCurrentlyEditedFunctionContext(state)
    if (!editContext)
      return state

    return {
      ...state,
      editedFunctions: replaceItem<Function>(
        state.editedFunctions, {
          ...editContext.currentFn,
          signatures: editContext.currentFn.signatures.concat(new Signature())
        },
        editContext.currentFnIdx
      )
    }

  } else if (isType(action, removeFunctionSignatureAction)) {

    const editContext = getCurrentlyEditedFunctionSignatureContext(state)
    if (!editContext)
      return state

    return {
      ...state,
      editedFunctions: replaceItem<Function>(
        state.editedFunctions, {
          ...editContext.currentFn,
          signatures: removeItem<Signature>(editContext.currentFn.signatures, editContext.currentSignatureIdx)
        },
        editContext.currentFnIdx
      )
    }

  } else if (isType(action, makeFunctionArgumentOptionalAction)) {

    const editContext = getCurrentlyEditedFunctionSignatureContext(state)
    if (!editContext)
      return state

    const [idx, arg] = findArgumentByName(editContext.currentSignature.requiredArgs,action.payload.argName)
    if (idx === -1)
      return state

    const updatedSignature = {
      ...editContext.currentSignature,
      requiredArgs: removeItem<Argument>(editContext.currentSignature.requiredArgs, idx),
      optionalArgs: editContext.currentSignature.optionalArgs.concat(new OptionalArgument(arg))
    }

    return {
      ...state,
      editedFunctions: replaceItem<Function>(
        state.editedFunctions, {
          ...editContext.currentFn,
          signatures: replaceItem<Signature>(editContext.currentFn.signatures, updatedSignature, editContext.currentSignatureIdx)
        },
        editContext.currentFnIdx
      )
    }

  }

  return state
}