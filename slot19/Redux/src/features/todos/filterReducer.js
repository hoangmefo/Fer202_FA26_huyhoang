import { SET_FILTER } from './todoActions.js'

export default function filterReducer(state = 'all', action) {
  return action.type === SET_FILTER ? action.payload : state
}
