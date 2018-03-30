import { combineReducers } from 'redux';

import editorReducer from './editor/reducer';
import { State as EditorState } from './editor/types';

export type State = {
  readonly editor: EditorState
}

export const reducer = combineReducers<State>({
  editor: editorReducer
})