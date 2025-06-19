import { useSessions } from '../store/sessions'
import { generateMarkdown } from '../utils/export'

export default function MarkdownPane() {
  const sessions = useSessions((s) => s.sessions)
  return (
    <aside className="w-full lg:w-1/3 p-6 rounded-2xl shadow bg-white dark:bg-slate-800 overflow-y-auto max-h-[80vh]">
      <h2 className="text-xl font-bold mb-4">Markdown Log</h2>
      <pre className="whitespace-pre-wrap font-mono text-sm">
        {generateMarkdown(sessions)}
      </pre>
    </aside>
  )
}
