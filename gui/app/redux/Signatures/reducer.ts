import { IArgument, IFunction, ISignature } from '@opencv4nodejs-gen/persistence/index';
import { State } from './types';
import { fetchFunctionSuccessAction, editFunctionAction, updateReturnValueNameAction, updateReturnValueTypeAction, editFunctionSignatureAction } from './actionCreators';
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

function updateSignature(state: State, reduce: (currentSignature: ISignature) => any): State {
  const currentFnIdx = state.editedFunctions.findIndex(makeHasId(state.currentlyEditing._id))
  if (currentFnIdx === -1)
    return state

  const currentFn = state.editedFunctions[currentFnIdx]
  const currentSignature = currentFn.signatures[state.currentlyEditing.selectedSignatureIdx]

  const updatedSignature = { ...currentSignature, ...reduce(currentSignature) }
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

    const { type, idx } = action.payload

    return updateSignature(state, (currentSignature) => (
      {
        returnValues: replaceItem<IArgument>(
          currentSignature.returnValues,
          { ...currentSignature.returnValues[idx], type },
          idx
        )
      }
    ))

  } else if (isType(action, updateReturnValueNameAction)) {

    const { name, idx } = action.payload

    return updateSignature(state, (currentSignature) => (
      {
        returnValues: replaceItem<IArgument>(
          currentSignature.returnValues,
          { ...currentSignature.returnValues[idx], name },
          idx
        )
      }
    ))
  }

  return state
}