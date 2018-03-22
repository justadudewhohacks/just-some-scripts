import { IArgument, IFunction, ISignature, IDeclaration, IType } from '@opencv4nodejs-gen/persistence';
import { State } from './types';
import { fetchFunctionSuccessAction, editFunctionAction, updateReturnValueNameAction, updateReturnValueTypeAction, editFunctionSignatureAction, updateArgumentTypeAction, updateArgumentNameAction, removeFunctionReturnValueAction, removeFunctionArgumentAction } from './actionCreators';
import { replaceItem, removeItem } from '../immutibilityUtils';
import { IAction, isType } from '../reduxUtils';
import { findArgumentByName, hasFnIdPredicate, getCurrentlyEdited } from './commons';
import { reduceSignature } from './reduceSignature';

const INITIAL_STATE : State = {
  functions: [],
  editedFunctions: [],
  currentlyEditing: { _id: null, selectedSignatureIdx: 0 }
}

function hasArgumentWithName(args: IArgument[], argName: string): boolean {
  return findArgumentByName(args, argName)[0] !== -1
}

function findTargetByArgName(signature: ISignature, argName: string) {
  return [
    'returnValues',
    'requiredArgs',
    'optionalArgs'
  ]
    .find(target => hasArgumentWithName(signature[target] || [], argName))
}

function removeArgument(state: State, target: string, argName: string): State {
  function reduceTarget(targetArray: IArgument[], idx: number, arg: IArgument): IArgument[] {
    return removeItem<IArgument>(
      targetArray,
      idx
    )
  }
  return reduceSignature(
    state,
    target,
    argName,
    reduceTarget
  )
}

function updateArgument(state: State, target: string, argName: string, reduce: (arg: IArgument) => IArgument): State {
  function reduceTarget(targetArray: IArgument[], idx: number, arg: IArgument): IArgument[] {
    return replaceItem<IArgument>(
      targetArray,
      reduce(arg),
      idx
    )
  }
  return reduceSignature(
    state,
    target,
    argName,
    reduceTarget
  )
}

export default function(state = INITIAL_STATE, action: IAction<any>) : State {

  if (isType(action, editFunctionAction)) {

    const { _id } = action.payload
    const hasId = hasFnIdPredicate(_id)
    if (!state.editedFunctions.some(hasId)) {
      const fn = state.functions.find(hasId)

      return {
        ...state,
        currentlyEditing: { _id, selectedSignatureIdx: 0 },
        editedFunctions: state.editedFunctions.concat(fn || [])
      }
    }
    return { ...state, currentlyEditing: { ...state.currentlyEditing, _id } }

  } else if (isType(action, editFunctionSignatureAction)) {

    return {
      ...state,
      currentlyEditing: { ...state.currentlyEditing, selectedSignatureIdx: action.payload.idx }
    }

  } else if (isType(action, fetchFunctionSuccessAction)) {

    const { fn } = action.payload
    const idx = state.functions.findIndex(hasFnIdPredicate(fn._id))

    if (idx !== -1) {
      return { ...state, functions: replaceItem<IFunction>(state.functions, fn, idx) }
    }
    return { ...state, functions: state.functions.concat(fn) }

  } else if (isType(action, updateReturnValueTypeAction)) {

    const { type, argName } = action.payload

    const target = findTargetByArgName(getCurrentlyEdited(state).currentSignature, argName)

    if (target !== 'returnValues')
      return state

    return updateArgument(
      state,
      target,
      argName,
      arg => ({ ...arg, type })
    )

  } else if (isType(action, updateReturnValueNameAction)) {

    const { name, argName } = action.payload

    const target = findTargetByArgName(getCurrentlyEdited(state).currentSignature, argName)

    if (target !== 'returnValues')
      return state

    return updateArgument(
      state,
      target,
      argName,
      arg => ({ ...arg, name })
    )
  } else if (isType(action, updateArgumentTypeAction)) {

    const { type, argName } = action.payload

    const target = findTargetByArgName(getCurrentlyEdited(state).currentSignature, argName)

    if (target !== 'requiredArgs' && target !== 'optionalArg')
      return state

    return updateArgument(
      state,
      target,
      argName,
      arg => ({ ...arg, type })
    )

  } else if (isType(action, updateArgumentNameAction)) {

    const { name, argName } = action.payload

    const target = findTargetByArgName(getCurrentlyEdited(state).currentSignature, argName)

    if (target !== 'requiredArgs' && target !== 'optionalArg')
      return state

    return updateArgument(
      state,
      target,
      argName,
      arg => ({ ...arg, name })
    )
  } else if (isType(action, removeFunctionReturnValueAction)) {

    const { argName } = action.payload

    const target = findTargetByArgName(getCurrentlyEdited(state).currentSignature, argName)

    if (target !== 'returnValues')
      return state

    return removeArgument(state, target, argName)

  } else if (isType(action, removeFunctionArgumentAction)) {

    const { argName } = action.payload

    const target = findTargetByArgName(getCurrentlyEdited(state).currentSignature, argName)

    if (target !== 'requiredArgs' && target !== 'optionalArg')
      return state

    return removeArgument(state, target, argName)

  }

  return state
}