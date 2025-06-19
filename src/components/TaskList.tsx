import { useState } from 'react'

interface Task {
  id: string
  title: string
  done: boolean
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')

  function addTask() {
    if (!input.trim()) return
    setTasks([...tasks, { id: crypto.randomUUID(), title: input.trim(), done: false }])
    setInput('')
  }

  function toggleTask(id: string) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-slate-800">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded border dark:bg-slate-900"
          placeholder="Add new task" />
        <button onClick={addTask} className="px-4 py-2 rounded bg-blue-600 text-white">Add</button>
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center gap-2">
            <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
            <span className={task.done ? 'line-through' : ''}>{task.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
