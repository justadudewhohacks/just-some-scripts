import { ActionTypes, Action, State } from './types'

const INITIAL_STATE : State = {
  isConnected: false
}

export default function(state = INITIAL_STATE, action: Action) : State {
  const { type, payload } = action

  switch (type) {
    case ActionTypes.CONNECT_TO_DATABASE_SUCCESS: {
      return { ...state, isConnected: true }
    }

    default:
      return state
  }
}
