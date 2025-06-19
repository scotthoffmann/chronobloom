import dayjs from 'dayjs'

export function generateMarkdown(sessions: any[]) {
  const date = dayjs().format('YYYY-MM-DD')
  const lines = [`## ${date}`]
  sessions.forEach((s) => {
    const status = s.status === 'complete' ? '[x]' : '[ ]'
    const task = s.task ? ` – **${s.task}**` : ''
    lines.push(`- ${status} **${s.type === 'focus' ? 'Focus' : 'Break'} ${s.length}:00**${task}`)
  })
  return lines.join('\n')
}

export function generateJSON(sessions: any[]) {
  return JSON.stringify({
    date: dayjs().format('YYYY-MM-DD'),
    sessions
  }, null, 2)
}
