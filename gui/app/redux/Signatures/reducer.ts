import { ActionTypes, Action, State } from './types'

const INITIAL_STATE : State = {
  signatures: []
}

export default function(state = INITIAL_STATE, action: Action) : State {
  const { type, payload } = action

  switch (type) {
    case ActionTypes.FETCH_FUNCTION_SIGNATURE_SUCCESS: {
      return { ...state, signatures: state.signatures.concat(payload.signature) }
    }

    default:
      return state
  }
}
