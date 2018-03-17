import { IFunction } from '@opencv4nodejs-gen/persistence/index';
import { ActionTypes, Action, State } from './types'
import { replaceItem } from '../../commons/immutableUtils';

const INITIAL_STATE : State = {
  signatures: []
}

export default function(state = INITIAL_STATE, action: Action) : State {
  const { type, payload } = action

  switch (type) {
    case ActionTypes.FETCH_FUNCTION_SIGNATURE_SUCCESS: {
      const { signature } = payload
      const idx = state.signatures.findIndex(sig => sig._id === signature._id)

      if (idx !== -1) {
        return { ...state, signatures: replaceItem<IFunction>(state.signatures, signature, idx) }
      }
      return { ...state, signatures: state.signatures.concat(signature) }
    }

    default:
      return state
  }
}
