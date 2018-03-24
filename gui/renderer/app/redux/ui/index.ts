import { combineReducers } from 'redux';
import { State as EditorState  } from './editor/types'
import editorReducer from './editor/reducer'

export type State = {
  readonly editor: EditorState
}

export const reducer = combineReducers<State>({
  editor: editorReducer
})