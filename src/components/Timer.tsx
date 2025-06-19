import { useTimer } from '../hooks/useTimer'

export default function Timer() {
  const { minutes, seconds, isRunning, onBreak, progress, start, pause, reset } = useTimer()

  const pad = (n: number) => n.toString().padStart(2, '0')

  const btn = (label: string, onClick: () => void, disabled = false) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded text-white ${
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      } ${
        label === 'Start'
          ? 'bg-green-600'
          : label === 'Pause'
          ? 'bg-yellow-600'
          : 'bg-red-600'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-slate-800">
      <h2 className="text-xl font-bold mb-4">{onBreak ? 'Break' : 'Focus'} Timer</h2>
      <div className="text-6xl font-mono mb-4">{pad(minutes)}:{pad(seconds)}</div>
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded mb-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div className="flex gap-2">
        {btn('Start', start, isRunning)}
        {btn('Pause', pause, !isRunning)}
        {btn('Reset', reset)}
      </div>
    </div>
  )
}
