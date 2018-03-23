import { combineReducers } from 'redux'

import databaseConnectionReducer from './databaseConnection/reducer'
import signaturesReducer from './signatures/reducer'
import cacheReducer from './cache/reducer'
import { State as DatabaseConnectionState } from './databaseConnection/types'
import { State as SignaturesState } from './signatures/types'
import { State as CacheState } from './cache/types'

export interface RootState {
  readonly databaseConnection: DatabaseConnectionState
  readonly signatures: SignaturesState
  readonly cache: CacheState
}

export default combineReducers<RootState>({
  databaseConnection: databaseConnectionReducer,
  signatures: signaturesReducer,
  cache: cacheReducer
})