import { remote } from 'electron'
import { createStore, applyMiddleware, compose  } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer'

const store = process.env.NODE_ENV === 'development'
  ? createStore(rootReducer,
      composeWithDevTools({})(
        applyMiddleware(
          createLogger(),
          thunk
        )
      )
    )
  : createStore(rootReducer, applyMiddleware(thunk))

export default store