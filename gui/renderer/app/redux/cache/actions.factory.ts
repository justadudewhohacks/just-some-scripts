import { Dispatch } from 'redux'
import { ISignaturesService } from './types';
import {
  fetchFunctionSuccessAction, fetchClassNamesSuccessAction
} from './actionCreators';
import { IAction } from '../reduxUtils';

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

        dispatch(fetchFunctionSuccessAction({ fn }))
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
          type: 'FETCHING_CLASS_NAMES_ERROR',
          payload: { error }
        })
      } 
    }
  }

  return {
    fetchFunction,
    fetchClassNames
  }
}

