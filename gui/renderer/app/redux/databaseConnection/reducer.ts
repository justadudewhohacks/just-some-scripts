import { State } from './types'
import { connectToDatabaseSuccessAction } from './actionCreators';
import { IAction, isType } from '../reduxUtils';

const INITIAL_STATE: State = {
  isConnected: false
}

export default function(state = INITIAL_STATE, action: IAction<any>) : State {
  const { type, payload } = action
  if (isType(action, connectToDatabaseSuccessAction)) {
    return { ...state, isConnected: true }
  }

  return state
}
