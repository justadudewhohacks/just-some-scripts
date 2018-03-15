import { combineReducers } from 'redux'

import databaseConnectionReducer from './DatabaseConnection/reducer'
import { State as DatabaseConnectionState } from './DatabaseConnection/types'

export interface RootState {
  readonly databaseConnection: DatabaseConnectionState
}

export default combineReducers<RootState>({
  databaseConnection: databaseConnectionReducer
})