import { IFunction, IFunctionMetaData } from '../../../../../persistence';
import { State } from './types';
import { fetchFunctionSuccessAction, fetchClassNamesSuccessAction, fetchFunctionMetaDataSuccessAction, unloadFunctionAction } from './actionCreators';
import { replaceItem, removeItem } from '../immutibilityUtils';
import { IAction, isType } from '../reduxUtils';
import { hasFnIdPredicate } from '../../commons/hasFnIdPredicate';

const INITIAL_STATE: State = {
  classNames: [],
  functionMetaDataByOwner: new Map(),
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

  } else if (isType(action, fetchFunctionMetaDataSuccessAction)) {

    const { functionMetaDatas } = action.payload

    const owners = Array.from(new Set(functionMetaDatas.map(m => m.owner)))
    const functionMetaDataByOwner = new Map(
      owners.map(owner => [owner, functionMetaDatas.filter(meta => meta.owner === owner)] as [string, IFunctionMetaData[]])
    )
    return { ...state, functionMetaDataByOwner }

  } else if (isType(action, unloadFunctionAction)) {

    const { _id } = action.payload
    
    const idx = state.functions.findIndex(hasFnIdPredicate(_id))
    if (idx !== -1) {
      return { ...state, functions: removeItem<IFunction>(state.functions, idx) }
    }

    return state

  } 

  return state
}