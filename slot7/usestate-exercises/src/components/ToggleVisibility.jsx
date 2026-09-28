import { useState } from 'react'
import Button from 'react-bootstrap/Button'

function ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggle = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body text-center">
        <h2 className="card-title">Toggle Visibility</h2>

        {isVisible && (
          <p className="mb-3">
            This text is currently visible.
          </p>
        )}

        <Button
          variant={isVisible ? 'danger' : 'primary'}
          onClick={handleToggle}
        >
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      </div>
    </div>
  )
}

export default ToggleVisibility