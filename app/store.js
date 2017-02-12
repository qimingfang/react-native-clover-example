import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from './reducers'
import middleware from './middlewares'

var initialState = {}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
)

export default store
