import Counter from './components/Counter'
import ControlledInput from './components/ControlledInput'
import ToggleVisibility from './components/ToggleVisibility'
import TodoList from './components/TodoList'
import ColorSwitcher from './components/ColorSwitcher'
import SearchFilter from './components/SearchFilter'
import DragDropList from './components/DragDropList'

function App() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">React useState Exercises</h1>

      <div className="d-flex flex-column gap-4">
        <Counter />
        <ControlledInput />
        <ToggleVisibility />
        <TodoList />
        <ColorSwitcher />
        <SearchFilter />
        <DragDropList />
      </div>
    </div>
  )
}

export default App