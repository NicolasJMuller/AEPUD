import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Adherent from "./pages/Adherent";
import Connexion from "./pages/Connexion";
import Evenement from "./pages/Evenement";
import Info from "./pages/Info";
import Snack from "./pages/Snack";
import Stock from "./pages/Stock";
import InfoAdmin from "./pages/InfoAdmin";
import Soiree from "./pages/Soiree";
import AuthProvider from './auth/AuthProvider'
import RequireAuth from './auth/RequireAuth'
import './App.css'



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="connexion" element={<Connexion />} />
            <Route element={<RequireAuth />}>
              <Route path="evenement" element={<Evenement />} />
              <Route path="soiree/:id" element={<Soiree />} />
              <Route path="*" element={<p>Page introuvable</p>} />
            </Route>
            <Route element={<RequireAuth role="ROLE_USER" />}>
              <Route index element={<Index />} />
              <Route path="info" element={<Info />} />
              <Route path="snack" element={<Snack />} />
            </Route>
            <Route element={<RequireAuth role="ROLE_ADMIN" />}>
              <Route path="adherent" element={<Adherent />} />
              <Route path="stock" element={<Stock />} />
              <Route path="infoadmin" element={<InfoAdmin />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App



