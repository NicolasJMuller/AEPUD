import { type Dispatch, type SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import Etoile from './Etoile';
import soirees from '../data/CardSoiree.json';

const JOURS = ['Lu', 'Ma', 'Me', 'Je', 'Ve'];
const MOIS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

type Props = {
    date: Date;
    setDate: Dispatch<SetStateAction<Date>>;
};

export default function Calendrier({ date, setDate }: Props) {
    const annee = date.getFullYear();
    const mois = date.getMonth();

    const nbJours = new Date(annee, mois + 1, 0).getDate();
    const premierJour = new Date(annee, mois, 1).getDay();
    const decalage = (premierJour + 6) % 7; // lundi = 0

    const cases: (number | null)[] = [
        ...Array(decalage).fill(null),
        ...Array.from({ length: nbJours }, (_, i) => i + 1),
    ];

    // on retire samedi et dimanche
    const casesSemaine = cases.filter((_, i) => i % 7 < 5);

    const changerMois = (delta: number) => setDate(new Date(annee, mois + delta, 1));

    // renvoie la soirée du jour (ou undefined)
    const trouverSoiree = (jour: number) => {
        const mm = String(mois + 1).padStart(2, '0');
        const jj = String(jour).padStart(2, '0');
        return soirees.find(s => s.dateSoiree === `${annee}.${mm}.${jj}`);
    };

    return (
        <div className="w-5/6 max-w-md mx-auto rounded-3xl overflow-hidden bg-white">
            {/* header rose, sans bordure */}
            <div className="bg-pink-400 text-white flex justify-between items-center px-4 py-4">
                <button onClick={() => changerMois(-1)}>◀</button>
                <h2 className="text-2xl font-bold">{MOIS[mois]} {annee}</h2>
                <button onClick={() => changerMois(1)}>▶</button>
            </div>

            {/* corps avec la bordure bleue, sans le haut */}
            <div className="grid grid-cols-5 text-center p-4 gap-y-2 text-indigo-600 font-bold border-8 border-t-0 border-indigo-600 rounded-b-3xl bg-white">
                {JOURS.map(j => (
                    <div key={j} className="text-xl">{j}</div>
                ))}

                {casesSemaine.map((jour, i) => {
                    const soiree = jour ? trouverSoiree(jour) : undefined;

                    return (
                        <div key={i} className="h-12 flex items-center justify-center">
                            {jour && (
                                soiree ? (
                                    <Link
                                        to={`/soiree/${soiree.id}`}
                                        className="relative w-12 h-12 flex items-center justify-center"
                                    >
                                        <Etoile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-[#F27EB4] hover:scale-110 transition-transform" />
                                        <span className="relative text-white">{jour}</span>
                                    </Link>
                                ) : (
                                    <span>{jour}</span>
                                )
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}