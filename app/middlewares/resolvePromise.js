/* global alert */

const { isFunction } = require('lodash')

function isPromise (val) {
  return val && isFunction(val.then)
}

export default store => next => action => {
  console.log(action)

  if (isPromise(action.payload)) {
    return action.payload.then(
      result => {
        return store.dispatch({ ...action, payload: result })
      },
      error => {
        console.log(error)
      }
    )
  } else {
    return next(action)
  }
}
