import { combineReducers } from 'redux'

import databaseConnectionReducer from './databaseConnection/reducer'
import signaturesReducer from './signatures/reducer'
import cacheReducer from './cache/reducer'
import { State as DatabaseConnectionState } from './databaseConnection/types'
import { State as SignaturesState } from './signatures/types'
import { State as CacheState } from './cache/types'
import { State as UiState, reducer as UiStateReducer } from './ui'

export type RootState = {
  readonly databaseConnection: DatabaseConnectionState
  readonly signatures: SignaturesState
  readonly cache: CacheState
  readonly ui: UiState
}

export default combineReducers<RootState>({
  databaseConnection: databaseConnectionReducer,
  signatures: signaturesReducer,
  cache: cacheReducer,
  ui: UiStateReducer
})