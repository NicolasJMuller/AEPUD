import { useRef, useState } from 'react'
import Facture from '../components/Facture'

function InfoAdmin() {
  const [factures, setFactures] = useState([1, 2])
  const prochainNumero = useRef(3)

  function ajouterFacture() {
    const numero = prochainNumero.current++
    setFactures((facturesActuelles) => [...facturesActuelles, numero])
  }

  function supprimerFacture(numero: number) {
    setFactures((facturesActuelles) => facturesActuelles.filter((facture) => facture !== numero))
  }

  return (
    <main className="min-h-screen">
      <div className="p-4 sm:p-6">
        <button
          type="button"
          aria-label="Ajouter une facture"
          onClick={ajouterFacture}
          className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-2xl bg-[#F079B5] text-white hover:bg-[#E660A1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4525F5] sm:h-40 sm:w-40 sm:rounded-[28px]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="h-11 w-11 sm:h-[72px] sm:w-[72px]"
          >
            <path d="M12 4.5v15M4.5 12h15" />
          </svg>
        </button>
      </div>
      {factures.map((numero) => (
        <Facture
          key={numero}
          numero={numero}
          imageInitiale={numero <= 2 ? '/facture-exemple.jpg' : ''}
          onSupprimer={() => supprimerFacture(numero)}
        />
      ))}
    </main>
  )
}

export default InfoAdmin

