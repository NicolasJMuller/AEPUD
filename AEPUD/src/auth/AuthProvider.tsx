import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { ApiError, enregistrerToken, expirationToken, lireToken, obtenirSession, obtenirToken } from './session'
import type { Session } from './session'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(lireToken)
  const [session, setSession] = useState<Session | null>(null)
  const [verification, setVerification] = useState(token !== null)
  const [erreur, setErreur] = useState('')

  function deconnecter() {
    enregistrerToken(null)
    setToken(null)
    setSession(null)
    setErreur('')
  }

  useEffect(() => {
    if (!token) return

    const controller = new AbortController()
    let timeout: number | undefined

    async function verifier(tokenActuel: string) {
      try {
        const utilisateur = await obtenirSession(tokenActuel, controller.signal)
        if (controller.signal.aborted || lireToken() !== tokenActuel) return

        const dureeRestante = expirationToken(tokenActuel) - Date.now()
        if (!(dureeRestante > 0)) {
          deconnecter()
          return
        }
        setSession(utilisateur)
        timeout = window.setTimeout(deconnecter, dureeRestante)
      } catch (error) {
        if (controller.signal.aborted || lireToken() !== tokenActuel) return

        setSession(null)
        if (error instanceof ApiError && error.status === 401) {
          deconnecter()
        } else {
          setErreur('Impossible de vérifier la connexion. Rechargez la page pour réessayer.')
        }
      } finally {
        if (!controller.signal.aborted) setVerification(false)
      }
    }

    void verifier(token)
    return () => {
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [token])

  async function connecter(username: string, password: string) {
    const { token: nouveauToken } = await obtenirToken(username, password)
    const utilisateur = await obtenirSession(nouveauToken)
    enregistrerToken(nouveauToken)
    setErreur('')
    setToken(nouveauToken)
    setSession(utilisateur)
    return utilisateur
  }

  return (
    <AuthContext.Provider value={{ session, verification, erreur, connecter, deconnecter }}>
      {children}
    </AuthContext.Provider>
  )
}
