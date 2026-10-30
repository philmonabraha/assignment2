import { useState } from 'react'

function TaskForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-task">New task</label>
      <input id="new-task" type="text" placeholder="Add a task…" value={text} onChange={event => setText(event.target.value)} />
      <button className="add-button" type="submit" disabled={!text.trim()}>Add task</button>
    </form>
  )
}

export default TaskForm
