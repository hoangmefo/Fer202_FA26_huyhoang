export const ADD_TODO = 'todos/add'
export const TOGGLE_TODO = 'todos/toggle'
export const DELETE_TODO = 'todos/delete'
export const EDIT_TODO = 'todos/edit'
export const CLEAR_COMPLETED = 'todos/clearCompleted'
export const SET_FILTER = 'filter/set'

let nextTodoId = 3

export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { id: nextTodoId++, text, done: false },
})
export const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: id })
export const deleteTodo = (id) => ({ type: DELETE_TODO, payload: id })
export const editTodo = (id, text) => ({
  type: EDIT_TODO,
  payload: { id, text },
})
export const clearCompleted = () => ({ type: CLEAR_COMPLETED })
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter })
