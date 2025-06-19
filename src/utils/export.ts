function formatDate() {
  return new Date().toISOString().slice(0, 10)
}

export function generateMarkdown(sessions: any[]) {
  const date = formatDate()
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
    date: formatDate(),
    sessions,
  }, null, 2)
}
