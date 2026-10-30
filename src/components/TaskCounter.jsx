import checkIcon from '../assets/check_icon.png'

function TaskCounter({ total, completed }) {
  return (
    <div className="task-counter" role="status" aria-label={`${total} total tasks, ${completed} completed`}>
      <img src={checkIcon} alt="" />
      <span>{total} / {completed}</span>
    </div>
  )
}

export default TaskCounter
