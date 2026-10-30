import { useState } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import TaskCounter from './components/TaskCounter'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Call Mom', completed: false },
    { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
    { id: 3, text: 'Return the textbook to Josie', completed: false },
    { id: 4, text: 'Buy the new album by Rake', completed: false },
    { id: 5, text: 'Buy a gift card for Dad', completed: false },
  ])
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [navigationOpen, setNavigationOpen] = useState(true)
  const completedCount = tasks.filter(task => task.completed).length
  const visibleTasks = tasks.filter(task => {
    const matchesFilter = filter === 'All' || (filter === 'Completed' ? task.completed : !task.completed)
    return matchesFilter && task.text.toLowerCase().includes(search.trim().toLowerCase())
  })

  function addTask(text) {
    const trimmedText = text.trim()
    if (!trimmedText) return
    setTasks(currentTasks => [...currentTasks, { id: crypto.randomUUID(), text: trimmedText, completed: false }])
  }

  function toggleTask(id) {
    setTasks(currentTasks => currentTasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  function deleteTask(id) {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id))
  }

  return (
    <div className="app">
      <header className="header">
        <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={navigationOpen} aria-controls="navigation" onClick={() => setNavigationOpen(open => !open)}>
          <img src={menuIcon} alt="" />
        </button>
        <label className="search">
          <img src={searchIcon} alt="" />
          <input type="search" aria-label="Quick Find" placeholder="Quick Find" value={search} onChange={event => setSearch(event.target.value)} />
        </label>
        <TaskCounter total={tasks.length} completed={completedCount} />
      </header>
      <div className={`layout${navigationOpen ? '' : ' navigation-hidden'}`}>
        <aside id="navigation" className="sidebar" aria-label="Task navigation">
          <a className="navigation-item selected" href="#inbox" aria-current="page"><img src={inboxIcon} alt="" /><strong>Inbox</strong><span>{tasks.length}</span></a>
          <div className="navigation-item"><img src={calendarIcon} alt="" /><span>Today</span></div>
          <div className="navigation-item"><img src={upcomingIcon} alt="" /><span>Upcoming</span></div>
        </aside>
        <main id="inbox" className="inbox">
          <h1>Inbox</h1>
          <div className="filters" role="group" aria-label="Filter tasks">
            {['All', 'Active', 'Completed'].map(option => (
              <button key={option} type="button" aria-label={option} aria-pressed={filter === option} className={filter === option ? 'filter selected' : 'filter'} onClick={() => setFilter(option)}>{option}</button>
            ))}
          </div>
          <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
          <TaskForm onAdd={addTask} />
        </main>
      </div>
    </div>
  )
}

export default App
