import { Dispatch } from 'redux'
import { IConnectionService } from './types'
import { connectToDatabaseSuccessAction } from './actionCreators';
import { IAction } from '../reduxUtils';

export default function(service: IConnectionService) {

  function connect() {
    return async function(dispatch: Dispatch<IAction<any>>) {
      dispatch({
        type: 'CONNECTING_TO_DATABASE'
      })

      try {
        await service.connect()
        dispatch(connectToDatabaseSuccessAction({}))
      } catch (error) {
        dispatch({
          type: 'CONNECT_TO_DATABASE_ERROR',
          payload: { error }
        })
      }
    }
  }

  return {
    connect
  }
}

