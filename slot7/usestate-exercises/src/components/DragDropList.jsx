import { useState } from 'react'
import Card from 'react-bootstrap/Card'

function DragDropList() {
  const [items, setItems] = useState([
    'React',
    'JavaScript',
    'HTML',
    'CSS',
    'Bootstrap',
  ])

  const [draggingItem, setDraggingItem] = useState(null)

  const handleDragStart = (index) => {
    setDraggingItem(index)
  }

  const handleDrop = (dropIndex) => {
    if (draggingItem === null || draggingItem === dropIndex) {
      return
    }

    const newItems = [...items]
    const draggedItem = newItems.splice(draggingItem, 1)[0]

    newItems.splice(dropIndex, 0, draggedItem)

    setItems(newItems)
    setDraggingItem(null)
  }

  const handleDragEnd = () => {
    setDraggingItem(null)
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Drag and Drop List</h2>

        <p className="text-muted">
          Drag an item and drop it in another position.
        </p>

        <div className="d-flex flex-column gap-2">
          {items.map((item, index) => (
            <Card
              key={item}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className="p-3"
              style={{ cursor: 'grab' }}
            >
              {item}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DragDropList