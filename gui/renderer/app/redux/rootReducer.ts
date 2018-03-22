import { combineReducers } from 'redux'

import databaseConnectionReducer from './DatabaseConnection/reducer'
import { State as DatabaseConnectionState } from './DatabaseConnection/types'
import signaturesReducer from './Signatures/reducer'
import { State as SignaturesState } from './Signatures/types'

export interface RootState {
  readonly databaseConnection: DatabaseConnectionState
  readonly signatures: SignaturesState
}

export default combineReducers<RootState>({
  databaseConnection: databaseConnectionReducer,
  signatures: signaturesReducer
})