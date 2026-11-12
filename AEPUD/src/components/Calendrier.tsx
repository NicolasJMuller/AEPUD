import { useState } from 'react';

const JOURS = ['Lu', 'Ma', 'Me', 'Je', 'Ve'];
const MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
              'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

// jours où il y a une soirée (format "AAAA-MM-JJ"), à toi de les mettre en JSON
const soirees = ['2026-09-09', '2026-09-10', '2026-09-22'];

export default function Calendrier() {
    const [date, setDate] = useState(new Date(2026, 8, 1)); // 8 = septembre (les mois commencent à 0)

    const annee = date.getFullYear();
    const mois = date.getMonth();

    const nbJours = new Date(annee, mois + 1, 0).getDate(); // jour 0 du mois suivant = dernier jour de ce mois
    const premierJour = new Date(annee, mois, 1).getDay();  // 0 = dimanche, 1 = lundi...
    const decalage = (premierJour + 6) % 7;                 // on passe en semaine Lundi = 0

    // on construit la liste des cases : des null pour le décalage, puis 1..nbJours
    const cases: (number | null)[] = [
        ...Array(decalage).fill(null),
        ...Array.from({ length: nbJours }, (_, i) => i + 1),
    ];

    // on retire les samedis/dimanches (colonnes 5 et 6)
    const casesSemaine = cases.filter((_, i) => i % 7 < 5);

    const changerMois = (delta: number) => setDate(new Date(annee, mois + delta, 1));

    const estSoiree = (jour: number) => {
        const mm = String(mois + 1).padStart(2, '0');
        const jj = String(jour).padStart(2, '0');
        return soirees.includes(`${annee}-${mm}-${jj}`);
    };

return (
    <div className="max-w-md mx-auto rounded-3xl overflow-hidden bg-white w-4/5">
        <div className="bg-pink-400 text-white flex justify-between items-center px-4 py-4">
            <button onClick={() => changerMois(-1)}>◀</button>
            <h2 className="text-2xl font-bold">{MOIS[mois]} {annee}</h2>
            <button onClick={() => changerMois(1)}>▶</button>
        </div>

        <div className="grid grid-cols-5 text-center p-4 gap-y-4 text-indigo-600 font-bold border-8 border-t-0 border-indigo-600 rounded-b-3xl bg-white">
              {JOURS.map(j => <div key={j} className="text-xl">{j}</div>)}

                {casesSemaine.map((jour, i) => (
                    <div key={i} className="h-10 flex items-center justify-center">
                        {jour && (
                            <span className={estSoiree(jour) ? 'bg-[#F27EB4] text-white rounded-full w-10 h-10 flex items-center justify-center' : ''}>
                                {jour}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}