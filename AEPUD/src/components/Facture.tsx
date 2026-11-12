import { useState } from 'react'
import type { ChangeEvent } from 'react'
import FactureImage from './FactureImage'

interface FactureProps {
  numero: number
  imageInitiale: string
  onSupprimer: () => void
}

function Facture({ numero, imageInitiale, onSupprimer }: FactureProps) {
  const [image, setImage] = useState(imageInitiale)
  const [message, setMessage] = useState('')
  const [chargement, setChargement] = useState(false)

  function modifierImage(event: ChangeEvent<HTMLInputElement>) {
    const fichier = event.target.files?.[0]

    // Permet de sélectionner plusieurs fois le même fichier.
    event.target.value = ''

    if (!fichier) {
      return
    }

    if (!fichier.type.startsWith('image/')) {
      setMessage('Choisis un fichier image.')
      return
    }

    setMessage('')
    setChargement(true)

    const lecteur = new FileReader()

    lecteur.onload = function () {
      if (typeof lecteur.result === 'string') {
        setImage(lecteur.result)
      }

      setChargement(false)
    }

    lecteur.onerror = function () {
      setMessage("Impossible de lire l'image.")
      setChargement(false)
    }

    lecteur.readAsDataURL(fichier)
  }

  return (
    <section
      aria-label={`Facture ${numero}`}
      className="mx-auto w-full max-w-lg p-4 sm:p-6"
    >

      {/* Carte */}
      <article className="rounded-[36px] border-8 border-[#4525F5] p-4 sm:rounded-[44px] sm:border-10 sm:p-6">
        <FactureImage image={image} />

        {/* Informations d'exemple */}
        <dl className="mt-5 space-y-2 text-2xl font-black text-[#4525F5] sm:text-3xl">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="text-4xl font-normal text-[#F079B5]"
            >
              ✳
            </span>

            <dt className="sr-only">Nom</dt>
            <dd>Nom</dd>
          </div>

          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="text-4xl font-normal text-[#F079B5]"
            >
              ✳
            </span>

            <dt className="sr-only">Prix</dt>
            <dd>Prix</dd>
          </div>

          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="text-4xl font-normal text-[#F079B5]"
            >
              ✳
            </span>

            <dt className="sr-only">Date</dt>
            <dd>
              <time dateTime="2026-06-02">02.06.2026</time>
            </dd>
          </div>
        </dl>

        {/* Modifier l'image ou supprimer la facture */}
        <div className="mt-5 flex justify-end gap-4">
          <label className="relative flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-[#F079B5] text-white hover:bg-[#E660A1] focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[#4525F5]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7"
            >
              <path d="m16 3 5 5-12 12-6 1 1-6Z" />
              <path d="m14 5 5 5" />
            </svg>

            <input
              type="file"
              accept="image/*"
              aria-label="Modifier l'image de la facture"
              onChange={modifierImage}
              disabled={chargement}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-wait"
            />
          </label>

          <button
            type="button"
            onClick={onSupprimer}
            aria-label={`Supprimer la facture ${numero}`}
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
              <path d="M5 12h14" />
            </svg>
          </button>
        </div>
      </article>

      <p role="status" className="mt-3 text-center text-sm text-slate-600">
        {chargement ? "Chargement de l'image…" : message}
      </p>
    </section>
  )
}

export default Facture

