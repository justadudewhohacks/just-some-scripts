import { Dispatch } from 'redux'
import { ActionTypes, Action, IConnectionService } from './types'

export default function(service: IConnectionService) {

  function connect() {
    return async function(dispatch: Dispatch<Action>) {
      dispatch({
        type: ActionTypes.CONNECTING_TO_DATABASE
      })

      try {
        await service.connect()
        dispatch({
          type: ActionTypes.CONNECT_TO_DATABASE_SUCCESS
        })
      } catch (error) {
        dispatch({
          type: ActionTypes.CONNECT_TO_DATABASE_ERROR,
          payload: { error }
        })
      }
    }
  }

  return {
    connect
  }
}

