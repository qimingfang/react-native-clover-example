import axios from 'axios'

const client = axios.create({
  baseURL: 'https://unify--api.herokuapp.com/api/'
})

export function refer (_id) {
  return client.put(`referrals/${_id}`, {
    status: 'claimed'
  })
}
