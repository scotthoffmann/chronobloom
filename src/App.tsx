import Timer from './components/Timer'
import TaskList from './components/TaskList'
import MarkdownPane from './components/MarkdownPane'

export default function App() {
  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-4">
      <div className="flex-1 space-y-4">
        <Timer />
        <TaskList />
      </div>
      <MarkdownPane />
    </div>
  )
}
