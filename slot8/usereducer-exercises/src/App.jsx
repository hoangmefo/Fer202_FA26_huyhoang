import { useState } from 'react';

import StepCounter from './usereducer/StepCounter';
import OrderTracker from './usereducer/OrderTracker';
import KanbanBoard from './usereducer/KanbanBoard';
import CourseWizard from './usereducer/CourseWizard';
import NotesBoard from './usereducer/NotesBoard';

function App() {
  const [
    currentExercise,
    setCurrentExercise,
  ] = useState(1);

  return (
    <div>
      <div className="container pt-4">
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          <button
            className={`btn ${
              currentExercise === 1
                ? 'btn-primary'
                : 'btn-outline-primary'
            }`}
            onClick={() =>
              setCurrentExercise(1)
            }
          >
            Bài 1 - Step Counter
          </button>

          <button
            className={`btn ${
              currentExercise === 2
                ? 'btn-primary'
                : 'btn-outline-primary'
            }`}
            onClick={() =>
              setCurrentExercise(2)
            }
          >
            Bài 2 - Order Tracker
          </button>

          <button
            className={`btn ${
              currentExercise === 3
                ? 'btn-primary'
                : 'btn-outline-primary'
            }`}
            onClick={() =>
              setCurrentExercise(3)
            }
          >
            Bài 3 - Kanban Board
          </button>

          <button
            className={`btn ${
              currentExercise === 4
                ? 'btn-primary'
                : 'btn-outline-primary'
            }`}
            onClick={() =>
              setCurrentExercise(4)
            }
          >
            Bài 4 - Course Wizard
          </button>

          <button
            className={`btn ${
              currentExercise === 5
                ? 'btn-primary'
                : 'btn-outline-primary'
            }`}
            onClick={() =>
              setCurrentExercise(5)
            }
          >
            Bài 5 - Notes Board
          </button>
        </div>
      </div>

      {currentExercise === 1 && (
        <StepCounter />
      )}

      {currentExercise === 2 && (
        <OrderTracker />
      )}

      {currentExercise === 3 && (
        <KanbanBoard />
      )}

      {currentExercise === 4 && (
        <CourseWizard
          initialCourseId="react"
        />
      )}

      {currentExercise === 5 && (
        <NotesBoard />
      )}
    </div>
  );
}

export default App;