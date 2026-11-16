import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const liensMembre = [
  ['/', 'Accueil'],
  ['/snack', 'Snack'],
  ['/evenement', 'Événement'],
  ['/info', 'Info'],
]

const liensAdmin = [
  ['/infoadmin', 'InfoAdmin'],
  ['/stock', 'Stock'],
  ['/evenement', 'Événement'],
  ['/adherent', 'Adhérent'],
]

export default function Layout() {
  const { session } = useAuth()
  const liens = session ? (session.roles.includes('ROLE_ADMIN') ? liensAdmin : liensMembre) : []

  return (
    <>
      <header>
        <nav className="flex flex-wrap gap-4">
          {liens.map(([url, nom]) => <NavLink key={url} to={url}>{nom}</NavLink>)}
          <NavLink to="/connexion">Connexion</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
