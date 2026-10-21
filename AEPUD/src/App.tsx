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
import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pas oublié de modifier dans layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="adherent" element={<Adherent />} />
          <Route path="connexion" element={<Connexion />} />
          <Route path="evenement" element={<Evenement />} />
          <Route path="info" element={<Info />} />
          <Route path="snack" element={<Snack />} />
          <Route path="stock" element={<Stock />} />
          <Route path="infoadmin" element={<InfoAdmin />} />
          <Route path="soiree/:id" element={<Soiree />} />
          <Route path="*" element={<p>Page introuvable</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App



