import { IFunction, IFunctionMetaData } from '../../../../../../persistence';
import { State } from './types';
import { IAction, isType } from '../../reduxUtils';
import { searchFunctionsInputChangedAction } from './actionCreators';

const INITIAL_STATE: State = {
  searchFunctionsInput: ''
}

export default function(state = INITIAL_STATE, action: IAction<any>) : State {

  if (isType(action, searchFunctionsInputChangedAction)) {

    return { ...state, searchFunctionsInput: action.payload.value }

  }

  return state
}