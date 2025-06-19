import { useState, useEffect, useRef } from 'react'
import { useSessions } from '../store/sessions'

export function useTimer(initialMinutes = 25, breakMinutes = 5) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [onBreak, setOnBreak] = useState(false)
  const timerRef = useRef<number | null>(null)
  const addSession = useSessions((s) => s.addSession)

  function start() {
    if (!isRunning) setIsRunning(true)
  }

  function pause() {
    if (isRunning) setIsRunning(false)
  }

  function reset() {
    pause()
    setOnBreak(false)
    setTimeLeft(initialMinutes * 60)
  }

  useEffect(() => {
    if (!isRunning) return

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 0) {
          addSession({
            type: onBreak ? 'break' : 'focus',
            length: onBreak ? breakMinutes : initialMinutes,
            status: 'complete',
          })
          const nextOnBreak = !onBreak
          setOnBreak(nextOnBreak)
          return (nextOnBreak ? breakMinutes : initialMinutes) * 60
        }
        return t - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRunning, onBreak, initialMinutes, breakMinutes])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const totalSeconds = (onBreak ? breakMinutes : initialMinutes) * 60
  const progress = 1 - timeLeft / totalSeconds

  return { minutes, seconds, isRunning, onBreak, start, pause, reset, progress, totalSeconds, timeLeft }
}
