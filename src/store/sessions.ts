import create from 'zustand'

export interface Session {
  id: string
  type: 'focus' | 'break'
  length: number
  status: 'complete' | 'interrupted'
}

interface State {
  sessions: Session[]
  addSession: (s: Omit<Session, 'id'>) => void
}

export const useSessions = create<State>((set) => ({
  sessions: [],
  addSession: (s) =>
    set((state) => ({
      sessions: [...state.sessions, { id: crypto.randomUUID(), ...s }],
    })),
}))
