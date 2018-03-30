import { IAction, isType } from '../reduxUtils';
import { connectToDatabaseSuccessAction } from './actionCreators';
import { State } from './types';

const INITIAL_STATE: State = {
  isConnected: false
}

export default function(state = INITIAL_STATE, action: IAction<any>) : State {

  if (isType(action, connectToDatabaseSuccessAction)) {
    return { ...state, isConnected: true }
  }

  return state
}
