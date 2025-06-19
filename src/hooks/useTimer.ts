import { useState, useEffect, useRef } from 'react'

export function useTimer(initialMinutes = 25, breakMinutes = 5) {
  const [minutes, setMinutes] = useState(initialMinutes)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [onBreak, setOnBreak] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  function start() {
    if (!isRunning) setIsRunning(true)
  }

  function pause() {
    if (isRunning) setIsRunning(false)
  }

  function reset() {
    pause()
    setMinutes(initialMinutes)
    setSeconds(0)
    setOnBreak(false)
  }

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((sec) => {
          if (sec === 0) {
            setMinutes((min) => {
              if (min === 0) {
                // switch mode
                const newOnBreak = !onBreak
                setOnBreak(newOnBreak)
                return newOnBreak ? breakMinutes : initialMinutes
              }
              return min - 1
            })
            return 59
          }
          return sec - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRunning, onBreak, initialMinutes, breakMinutes])

  return { minutes, seconds, isRunning, onBreak, start, pause, reset }
}
