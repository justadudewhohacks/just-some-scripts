import { Dispatch } from 'redux'
import {
  searchFunctionsInputChangedAction
} from './actionCreators';
import { IAction } from '../../reduxUtils';

export function searchFunctionsInputChanged(value: string) {
  return function(dispatch: Dispatch<IAction<any>>) {
    dispatch(searchFunctionsInputChangedAction({ value }))
  }
}
