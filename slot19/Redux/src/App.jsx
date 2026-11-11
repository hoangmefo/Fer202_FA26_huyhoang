import { useState } from 'react'
import { Container } from 'react-bootstrap'
import CounterLesson from './pages/CounterLesson.jsx'
import TodoLesson from './pages/TodoLesson.jsx'
import UsersLesson from './pages/UsersLesson.jsx'
import ShopLesson from './pages/ShopLesson.jsx'
import StudentsLesson from './pages/StudentsLesson.jsx'

const LESSONS = [
  { id: 'counter', number: '01', label: 'Redux cơ bản', title: 'Counter' },
  { id: 'todos', number: '02', label: 'combineReducers', title: 'Todo list' },
  { id: 'users', number: '03', label: 'Redux Thunk', title: 'Users API' },
  { id: 'shop', number: '04', label: 'Redux Toolkit', title: 'RTK Shop' },
  { id: 'students', number: '05', label: 'Async CRUD', title: 'Sinh viên' },
]

const LESSON_CONTENT = {
  counter: <CounterLesson />,
  todos: <TodoLesson />,
  users: <UsersLesson />,
  shop: <ShopLesson />,
  students: <StudentsLesson />,
}

function App() {
  const [activeLesson, setActiveLesson] = useState('counter')
  const lesson = LESSONS.find((item) => item.id === activeLesson)

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={() => setActiveLesson('counter')}>
          <span className="brand-mark">R</span>
          <span>Redux<span className="brand-light">Lab</span></span>
        </a>
        <span className="topbar-caption">FER202 <span>·</span> Slot 19</span>
      </header>

      <Container className="workspace">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">HỌC QUA THỰC HÀNH</span>
            <h1>Redux, từ nền tảng đến ứng dụng</h1>
            <p>Năm bài thực hành về state toàn cục, async actions và Redux Toolkit.</p>
          </div>
          <div className="hero-stats">
            <strong>05</strong>
            <span>bài thực hành</span>
          </div>
        </section>

        <div className="lesson-layout">
          <aside className="lesson-nav" aria-label="Danh sách bài học">
            <p className="nav-heading">NỘI DUNG</p>
            {LESSONS.map((item) => (
              <button
                className={`lesson-link ${activeLesson === item.id ? 'active' : ''}`}
                key={item.id}
                onClick={() => setActiveLesson(item.id)}
                type="button"
              >
                <span className="lesson-number">{item.number}</span>
                <span className="lesson-link-copy">
                  <strong>{item.title}</strong>
                  <small>{item.label}</small>
                </span>
                <span className="lesson-arrow" aria-hidden="true">›</span>
              </button>
            ))}
            <div className="devtools-note">
              <span className="devtools-dot" />
              <span>Mở Redux DevTools để theo dõi state và action.</span>
            </div>
          </aside>

          <main className="lesson-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">BÀI {lesson.number}</span>
                <h2>{lesson.title}</h2>
              </div>
              <span className="topic-pill">{lesson.label}</span>
            </div>
            {LESSON_CONTENT[activeLesson]}
          </main>
        </div>
        <footer className="page-footer">Redux Lab <span>·</span> FER202</footer>
      </Container>
    </div>
  )
}

export default App
