import * as api from '../util/api'

export function refer (_id) {
  return {
    type: 'REFER',
    payload: api.refer(_id)
  }
}
