import Factures from '../components/Facture'

function InfoAdmin() {
  return (
    <main className="min-h-screen bg-slate-50">
      <h1 className="px-4 pt-6 text-center text-3xl font-bold">
        Les factures de l'AEPUD
      </h1>

      <Factures />
    </main>
  )
}

export default InfoAdmin
