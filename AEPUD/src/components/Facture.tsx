import { useState } from 'react'
import type { ChangeEvent } from 'react'
import FactureImage from './FactureImage'

function Factures() {
  const [imageFacture, setImageFacture] = useState('')

  function ajouterFacture(event: ChangeEvent<HTMLInputElement>) {
    const fichier = event.target.files?.[0]

    if (!fichier) {
      return
    }

    if (!fichier.type.startsWith('image/')) {
      alert('Choisis une image de ta facture.')
      return
    }

    const lecteur = new FileReader()

    lecteur.onload = function () {
      if (typeof lecteur.result === 'string') {
        setImageFacture(lecteur.result)
      }
    }

    lecteur.readAsDataURL(fichier)
  }

  return (
    <section className="mx-auto w-full max-w-sm p-4">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Mes factures
      </h2>

      <div className="flex flex-col gap-4">

        <div>
          <label
            htmlFor="choisir-facture"
            className="block cursor-pointer"
          >
            {imageFacture === '' ? (
              <div className="flex aspect-square w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-400 bg-slate-100">
                <span
                  aria-hidden="true"
                  className="text-6xl text-slate-500"
                >
                  +
                </span>

                <span className="mt-2 text-sm text-slate-600">
                  Ajouter une facture
                </span>
              </div>
            ) : (
              <FactureImage
                image={imageFacture}
                description="Facture ajoutée"
              />
            )}
          </label>

          <input
            id="choisir-facture"
            type="file"
            accept="image/*"
            aria-label="Choisir une image de facture"
            onChange={ajouterFacture}
            className="mt-3 block w-full text-sm"
          />
        </div>
      </div>
    </section>
  )
}

export default Factures