import { Dispatch } from 'redux'
import { ActionTypes, Action, ISignaturesService } from './types'

export default function(service: ISignaturesService) {

  function fetchFunctionSignature(name: string) {
    return async function(dispatch: Dispatch<Action>) {
      const [first = '', className = ''] = name.split('.').map(s => s.trim())
      const owner = `${(first[0] || '').toUpperCase()}${first.substr(1)}`

      if (!owner || !className) {
        dispatch({
          type: ActionTypes.FETCH_FUNCTION_SIGNATURE_INVALID_INPUT,
          payload: { owner, className }
        })
        return
      }

      dispatch({
        type: ActionTypes.FETCHING_FUNCTION_SIGNATURE,
        payload: { owner, className }
      })

      try {
        const signature = await service.fetchFunctionSignature({ owner, className })
        if (!signature) {
          dispatch({
            type: ActionTypes.FETCH_FUNCTION_SIGNATURE_NOT_FOUND,
            payload: { owner, className }
          })
          return
        }
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
    fetchFunctionSignature
  }
}

