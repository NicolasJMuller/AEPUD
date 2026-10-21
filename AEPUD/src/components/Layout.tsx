import { Outlet, NavLink } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/adherent">Adhérent</NavLink>
          <NavLink to="/evenement">Événement</NavLink>
          <br />
          <NavLink to="/snack">Snack</NavLink>
          <NavLink to="/stock">Stock</NavLink>
          <NavLink to="/info">Info</NavLink>
          <br />
          
          <NavLink to="/infoadmin">InfoAdmin</NavLink>
          <NavLink to="/connexion">Connexion</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}