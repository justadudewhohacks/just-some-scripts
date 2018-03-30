import { Dispatch } from 'redux';

import { IAction } from '../../reduxUtils';
import {
  closeSaveFunctionDialogAction,
  openSaveFunctionDialogAction,
  searchFunctionsInputChangedAction,
} from './actionCreators';

export function searchFunctionsInputChanged(value: string) {
  return function(dispatch: Dispatch<IAction<any>>) {
    dispatch(searchFunctionsInputChangedAction({ value }))
  }
}

export function openSaveFunctionDialog() {
  return function(dispatch: Dispatch<IAction<any>>) {
    dispatch(openSaveFunctionDialogAction())
  }
}

export function closeSaveFunctionDialog() {
  return function(dispatch: Dispatch<IAction<any>>) {
    dispatch(closeSaveFunctionDialogAction())
  }
}