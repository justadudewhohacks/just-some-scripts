import { IFunction } from '@opencv4nodejs-gen/persistence/index';
import { State } from './types';
import { fetchFunctionSuccessAction, editFunctionAction } from './actionCreators';
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

export default function(state = INITIAL_STATE, action: IAction<any>) : State {
  function getIndex(functions: IFunction[], _id: string) {
    return functions.findIndex(f => f._id === _id)
  }

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

  } else if (isType(action, fetchFunctionSuccessAction)) {

    const { fn } = action.payload
    const idx = state.functions.findIndex(makeHasId(fn._id))

    if (idx !== -1) {
      return { ...state, functions: replaceItem<IFunction>(state.functions, fn, idx) }
    }
    return { ...state, functions: state.functions.concat(fn) }

  }

  return state
}
