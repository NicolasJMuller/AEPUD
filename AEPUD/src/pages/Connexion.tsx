import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { accueilSession, ApiError } from '../auth/session'

export default function Connexion() {
  const { session, verification, connecter, deconnecter } = useAuth()
  const [erreur, setErreur] = useState('')
  const [enCours, setEnCours] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const retour = location.state?.retour as { pathname: string; search: string; hash: string } | undefined

  async function soumettre(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formulaire = new FormData(event.currentTarget)
    setErreur('')
    setEnCours(true)
    try {
      const utilisateur = await connecter(String(formulaire.get('username')), String(formulaire.get('password')))
      const chemins = utilisateur.roles.includes('ROLE_ADMIN')
        ? ['/infoadmin', '/stock', '/adherent']
        : ['/', '/info', '/snack']
      const chemin = retour?.pathname.replace(/\/+$/, '').toLowerCase() || '/'
      const autorise = chemins.includes(chemin) || chemin === '/evenement' || chemin.startsWith('/soiree/')
      navigate(retour && autorise ? retour : accueilSession(utilisateur), { replace: true })
    } catch (error) {
      setErreur(error instanceof ApiError && error.status === 401
        ? 'Identifiant ou mot de passe incorrect.'
        : 'Le service de connexion est indisponible.')
    } finally {
      setEnCours(false)
    }
  }

  return (
    <section className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-3xl font-bold">Connexion</h1>
      {verification ? <p role="status">Vérification de la connexion…</p> : session ? (
        <>
          <p>Connecté en tant que {session.username}.</p>
          <Link to={accueilSession(session)}>Retour au site</Link>
          <button type="button" className="block rounded-lg border px-4 py-2" onClick={deconnecter}>
            Se déconnecter
          </button>
        </>
      ) : (
        <form onSubmit={soumettre} className="grid gap-4">
          {import.meta.env.DEV && (
            <div className="space-y-1 rounded-lg border p-4">
              <p className="font-bold">Identifiants de démonstration initiaux</p>
              <p>User <code>user@user.fr</code> / <code>user123</code></p>
              <p>Admin <code>admin@admin.fr</code> / <code>admin123</code></p>
            </div>
          )}
          {retour && <p>Identifiez-vous pour accéder à cette page.</p>}
          <label className="grid gap-1">
            Identifiant
            <input name="username" autoComplete="username" required className="rounded-lg border p-2" />
          </label>
          <label className="grid gap-1">
            Mot de passe
            <input name="password" type="password" autoComplete="current-password" required className="rounded-lg border p-2" />
          </label>
          {erreur && <p role="alert">{erreur}</p>}
          <button type="submit" disabled={enCours} className="rounded-lg bg-[#4525F5] px-4 py-2 text-white">
            {enCours ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      )}
    </section>
  )
}
