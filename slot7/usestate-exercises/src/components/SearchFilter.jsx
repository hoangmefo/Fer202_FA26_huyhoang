import { useState } from 'react'
import Form from 'react-bootstrap/Form'

function SearchFilter() {
  const [query, setQuery] = useState('')

  const items = [
    'React',
    'JavaScript',
    'HTML',
    'CSS',
    'Bootstrap',
    'Node.js',
  ]

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title">Search Filter</h2>

        <Form.Group>
          <Form.Label>Search</Form.Label>

          <Form.Control
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search items..."
          />
        </Form.Group>

        <ul className="list-group mt-3">
          {filteredItems.map((item) => (
            <li key={item} className="list-group-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SearchFilter