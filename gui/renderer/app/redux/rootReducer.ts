import { combineReducers } from 'redux';

import cacheReducer from './cache/reducer';
import { State as CacheState } from './cache/types';
import databaseConnectionReducer from './databaseConnection/reducer';
import { State as DatabaseConnectionState } from './databaseConnection/types';
import signaturesReducer from './signatures/reducer';
import { State as SignaturesState } from './signatures/types';
import { reducer as UiStateReducer, State as UiState } from './ui';

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