import { Dispatch } from 'redux'
import { ActionTypes, Action, ISignaturesService } from './types'

export default function(service: ISignaturesService) {

  function fetchFunctionSignature(name: string) {
    return async function(dispatch: Dispatch<Action>) {
      dispatch({
        type: ActionTypes.FETCHING_FUNCTION_SIGNATURE
      })

      try {
        const signature = await service.fetchFunctionSignature(name)
        dispatch({
          type: ActionTypes.FETCH_FUNCTION_SIGNATURE_SUCCESS,
          payload: { signature }
        })
      } catch (error) {
        dispatch({
          type: ActionTypes.FETCH_FUNCTION_SIGNATURE_ERROR,
          payload: { error }
        })
      }
    }
  }

  return {
    connect
  }
}

