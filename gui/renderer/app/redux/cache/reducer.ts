import { Function, IFunctionMetaData } from '@opencv4nodejs-gen/entities';

import { hasFnIdPredicate } from '../../commons/hasFnIdPredicate';
import { removeItem, replaceItem } from '../immutibilityUtils';
import { IAction, isType } from '../reduxUtils';
import {
  fetchClassNamesSuccessAction,
  fetchFunctionMetaDataSuccessAction,
  fetchFunctionSuccessAction,
  unloadFunctionAction,
} from './actionCreators';
import { State } from './types';

const INITIAL_STATE: State = {
  classNames: [],
  functionMetaDataByOwner: new Map(),
  functions: []
}

export default function(state = INITIAL_STATE, action: IAction<any>) : State {

  if (isType(action, fetchFunctionSuccessAction)) {

    const { fn } = action.payload
    const idx = state.functions.findIndex(hasFnIdPredicate(fn.uuid))

    if (idx !== -1) {
      return { ...state, functions: replaceItem<Function>(state.functions, fn, idx) }
    }
    return { ...state, functions: state.functions.concat(fn) }

  } else if (isType(action, fetchClassNamesSuccessAction)) {

    return { ...state, classNames: action.payload.classNames }

  } else if (isType(action, fetchFunctionMetaDataSuccessAction)) {

    const { functionMetaDatas } = action.payload

    const owners = Array.from(new Set(functionMetaDatas.map(m => m.owner)))
    const functionMetaDataByOwner = new Map(
      owners.map(owner => [owner, functionMetaDatas.filter(meta => meta.owner === owner)] as [string, IFunctionMetaData[]])
    )
    return { ...state, functionMetaDataByOwner }

  } else if (isType(action, unloadFunctionAction)) {

    const { uuid } = action.payload

    const idx = state.functions.findIndex(hasFnIdPredicate(uuid))
    if (idx !== -1) {
      return { ...state, functions: removeItem<Function>(state.functions, idx) }
    }

    return state

  }

  return state
}