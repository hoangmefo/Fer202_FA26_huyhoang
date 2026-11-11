import {
  ADD_TODO,
  CLEAR_COMPLETED,
  DELETE_TODO,
  EDIT_TODO,
  TOGGLE_TODO,
} from './todoActions.js'

const initialState = [
  { id: 1, text: 'Tìm hiểu Redux store và action', done: true },
  { id: 2, text: 'Thực hành reducer bất biến', done: false },
]

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload]
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
      )
    case EDIT_TODO:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo,
      )
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload)
    case CLEAR_COMPLETED:
      return state.filter((todo) => !todo.done)
    default:
      return state
  }
}
