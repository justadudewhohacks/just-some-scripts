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

function makeHasId(_id: string) {
  return function(fn: IFunction) {
    return fn._id === _id
  }
}

function updateSignature(state: State, target: string, argName: string, reduce: (arg: IArgument) => IArgument): State {
  const currentFnIdx = state.editedFunctions.findIndex(makeHasId(state.currentlyEditing._id))
  if (currentFnIdx === -1)
    return state

  const currentFn = state.editedFunctions[currentFnIdx]
  const currentSignature = currentFn.signatures[state.currentlyEditing.selectedSignatureIdx]

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

function findArgumentByName(args: IArgument[], argName: string): [number, IArgument | null] {
  const idx = args.findIndex(arg => arg.name === argName)
  return [idx, args[idx]]
}

export default function(state = INITIAL_STATE, action: IAction<any>) : State {

  if (isType(action, editFunctionAction)) {

    const { _id } = action.payload
    const hasId = makeHasId(_id)
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
    const idx = state.functions.findIndex(makeHasId(fn._id))

    if (idx !== -1) {
      return { ...state, functions: replaceItem<IFunction>(state.functions, fn, idx) }
    }
    return { ...state, functions: state.functions.concat(fn) }

  } else if (isType(action, updateReturnValueTypeAction)) {

    const { type, argName } = action.payload

    return updateSignature(
      state,
      'returnValues',
      argName,
      arg => ({ ...arg, type })
    )

  } else if (isType(action, updateReturnValueNameAction)) {

    const { name, argName } = action.payload

    return updateSignature(
      state,
      'returnValues',
      argName,
      arg => ({ ...arg, name })
    )
  } else if (isType(action, updateArgumentTypeAction)) {


    // TODO
  } else if (isType(action, updateArgumentNameAction)) {


        // TODO
  }

  return state
}