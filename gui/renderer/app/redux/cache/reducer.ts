import { IFunction } from '@opencv4nodejs-gen/persistence';
import { State } from './types';
import { fetchFunctionSuccessAction, fetchClassNamesSuccessAction } from './actionCreators';
import { replaceItem } from '../immutibilityUtils';
import { IAction, isType } from '../reduxUtils';
import { hasFnIdPredicate } from '../../commons/hasFnIdPredicate';

const INITIAL_STATE: State = {
  classNames: [],
  functions: []
}

export default function(state = INITIAL_STATE, action: IAction<any>) : State {

  if (isType(action, fetchFunctionSuccessAction)) {

    const { fn } = action.payload
    const idx = state.functions.findIndex(hasFnIdPredicate(fn._id))

    if (idx !== -1) {
      return { ...state, functions: replaceItem<IFunction>(state.functions, fn, idx) }
    }
    return { ...state, functions: state.functions.concat(fn) }

  } else if (isType(action, fetchClassNamesSuccessAction)) {

    return { ...state, classNames: action.payload.classNames }

  }

  return state
}