import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { accueilSession } from './session'

export default function RequireAuth({ role }: { role?: 'ROLE_USER' | 'ROLE_ADMIN' }) {
  const { session, verification, erreur } = useAuth()
  const location = useLocation()

  if (verification) return <p role="status">Vérification de la connexion…</p>
  if (erreur) return <p role="alert">{erreur} <Link to="/connexion">Connexion</Link></p>
  if (!session) return <Navigate to="/connexion" replace state={{ retour: location }} />
  if (role && !session.roles.includes(role)) {
    return <p role="alert">Accès réservé. <Link to={accueilSession(session)}>Revenir à l’accueil</Link></p>
  }
  return <Outlet />
}
