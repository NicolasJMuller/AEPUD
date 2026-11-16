import { useRef, useState } from 'react'
import Bureau from '../components/Bureau'
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
      <Bureau />
      <div className="mx-auto mb-6 flex w-full max-w-lg items-center justify-between gap-4 px-4 pt-2 sm:mb-4 sm:px-6">
        <h2 className="text-3xl font-black text-[#4525F5] sm:text-4xl">Factures</h2>
        <button
          type="button"
          aria-label="Ajouter une facture"
          onClick={ajouterFacture}
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-[#F079B5] text-white hover:bg-[#E660A1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4525F5]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            className="h-7 w-7"
          >
            <path d="M12 4.5v15M4.5 12h15" />
          </svg>
        </button>
      </div>
      {factures.map((numero) => (
        <Facture
          key={numero}
          numero={numero}
          onSupprimer={() => supprimerFacture(numero)}
        />
      ))}
    </main>
  )
}

export default InfoAdmin

