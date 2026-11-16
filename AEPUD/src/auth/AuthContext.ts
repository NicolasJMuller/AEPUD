import { createContext, useContext } from 'react'
import type { Session } from './session'

export interface Auth {
  session: Session | null
  verification: boolean
  erreur: string
  connecter: (username: string, password: string) => Promise<Session>
  deconnecter: () => void
}

export const AuthContext = createContext<Auth | null>(null)

export function useAuth() {
  const auth = useContext(AuthContext)
  if (!auth) {
    throw new Error('AuthProvider manquant')
  }
  return auth
}
