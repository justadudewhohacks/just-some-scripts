import { IAction, isType } from '../../reduxUtils';
import {
  closeSaveFunctionDialogAction,
  openSaveFunctionDialogAction,
  searchFunctionsInputChangedAction,
} from './actionCreators';
import { State } from './types';

const INITIAL_STATE: State = {
  searchFunctionsInput: '',
  isSaveFunctionDialogOpen: false
}

export default function(state = INITIAL_STATE, action: IAction<any>) : State {

  if (isType(action, searchFunctionsInputChangedAction)) {

    return { ...state, searchFunctionsInput: action.payload.value }

  } else if (isType(action, openSaveFunctionDialogAction)) {

    return { ...state, isSaveFunctionDialogOpen: true }

  } else if (isType(action, closeSaveFunctionDialogAction)) {

    return { ...state, isSaveFunctionDialogOpen: false }

  }

  return state
}