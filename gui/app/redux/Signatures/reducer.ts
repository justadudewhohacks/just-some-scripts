import { IArgument, IFunction, ISignature, IDeclaration, IType } from '@opencv4nodejs-gen/persistence/index';
import { State } from './types';
import { fetchFunctionSuccessAction, editFunctionAction, updateReturnValueNameAction, updateReturnValueTypeAction, editFunctionSignatureAction, updateArgumentTypeAction, updateArgumentNameAction } from './actionCreators';
import { replaceItem } from '../immutibilityUtils';
import { IAction, isType } from '../reduxUtils';

const INITIAL_STATE : State = {
  functions: [],
  editedFunctions: [],
  currentlyEditing: { _id: null, selectedSignatureIdx: 0 }
}

function hasFnIdPredicate(_id: string) {
  return function(fn: IFunction) {
    return fn._id === _id
  }
}

function findArgumentByName(args: IArgument[], argName: string): [number, IArgument | null] {
  const idx = args.findIndex(arg => arg.name === argName)
  return [idx, args[idx]]
}

function hasArgumentWithName(args: IArgument[], argName: string): boolean {
  return findArgumentByName(args, argName)[0] !== -1
}

function findTargetByArgName(signature: ISignature, argName: string) {
  return [
    'returnValue', 
    'requiredArgs', 
    'optionalArgs'
  ]
    .find(target => hasArgumentWithName(signature[target] || [], argName))
}

function getCurrentlyEdited(state: State) {
  const currentFnIdx = state.editedFunctions.findIndex(hasFnIdPredicate(state.currentlyEditing._id))
  if (currentFnIdx === -1)
    return { currentFnIdx, currentFn: null, currentSignature: null }

  const currentFn = state.editedFunctions[currentFnIdx]
  const currentSignature = currentFn.signatures[state.currentlyEditing.selectedSignatureIdx]

  return { currentFnIdx, currentFn, currentSignature }
}

function updateSignature(state: State, target: string, argName: string, reduce: (arg: IArgument) => IArgument): State {

  const { currentFnIdx, currentFn, currentSignature } = getCurrentlyEdited(state)

  if (!currentFn || !currentSignature)
    return state

  const [idx, arg] = findArgumentByName(currentSignature[argName] || [], argName)

  if (idx === -1)
    return state

  const updatedSignature = {
    ...currentSignature,
    [target]: replaceItem<IArgument>(
      currentSignature[target],
      reduce(arg),
      idx
    )
  }
  const updatedSignatures = replaceItem<ISignature>(currentFn.signatures, updatedSignature, state.currentlyEditing.selectedSignatureIdx)
  const updatedFunction = { ...currentFn, signatures: updatedSignatures }

  return {
    ...state,
    editedFunctions: replaceItem<IFunction>(state.editedFunctions, updatedFunction, currentFnIdx)
   }
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

    return updateSignature(
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

    return updateSignature(
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

    return updateSignature(
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

    return updateSignature(
      state,
      target,
      argName,
      arg => ({ ...arg, name })
    )
  }

  return state
}