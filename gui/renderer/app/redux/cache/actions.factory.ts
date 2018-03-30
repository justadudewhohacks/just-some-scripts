import { Dispatch } from 'redux';

import { Function } from '../../../../../entities/classes/Function';
import { IAction } from '../reduxUtils';
import {
  fetchClassNamesSuccessAction,
  fetchFunctionMetaDataSuccessAction,
  fetchFunctionSuccessAction,
  unloadFunctionAction,
} from './actionCreators';
import { ISignaturesService } from './types';

export default function(service: ISignaturesService) {

  function fetchFunction(name: string) {
    return async function(dispatch: Dispatch<IAction<any>>) {
      const [first = '', className = ''] = name.split('.').map(s => s.trim())
      const owner = `${(first[0] || '').toUpperCase()}${first.substr(1)}`

      if (!owner || !className) {
        dispatch({
          type: 'FETCH_FUNCTION_INVALID_INPUT',
          payload: { owner, className }
        })
        return
      }

      dispatch({
        type: 'FETCHING_FUNCTION',
        payload: { owner, className }
      })

      try {
        const fn = await service.fetchFunction({ owner, className })
        if (!fn) {
          dispatch({
            type: 'FETCH_FUNCTION_NOT_FOUND',
            payload: { owner, className }
          })
          return
        }

        dispatch(fetchFunctionSuccessAction({ fn: new Function(fn) }))
      } catch (error) {
        dispatch({
          type: 'FETCH_FUNCTION_ERROR',
          payload: { error }
        })
      }
    }
  }

  function fetchClassNames() {
    return async function(dispatch: Dispatch<IAction<any>>) {
      dispatch({
        type: 'FETCHING_CLASS_NAMES'
      })

      try {
        const classNames = await service.fetchClassNames()
        dispatch(fetchClassNamesSuccessAction({ classNames }))
      } catch (error) {
        dispatch({
          type: 'FETCH_CLASS_NAMES_ERROR',
          payload: { error }
        })
      }
    }
  }

  function fetchFunctionMetaData() {
    return async function(dispatch: Dispatch<IAction<any>>) {
      dispatch({
        type: 'FETCHING_FUNCTION_META_DATAS'
      })

      try {
        const functionMetaDatas = await service.fetchFunctionMetaData()
        dispatch(fetchFunctionMetaDataSuccessAction({ functionMetaDatas }))
      } catch (error) {
        dispatch({
          type: 'FETCH_FUNCTION_META_DATAS_ERROR',
          payload: { error }
        })
      }
    }
  }

  function unloadFunction(uuid: string) {
    return function(dispatch: Dispatch<IAction<any>>) {
      return dispatch(unloadFunctionAction({ uuid }))
    }
  }

  return {
    fetchFunction,
    fetchClassNames,
    fetchFunctionMetaData,
    unloadFunction
  }
}

