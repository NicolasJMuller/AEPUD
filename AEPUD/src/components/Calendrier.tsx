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

    const casesSemaine = cases.filter((_, i) => i % 7 < 5);

    const changerMois = (delta: number) => setDate(new Date(annee, mois + delta, 1));

    // renvoie la soirée du jour (ou undefined)
    const trouverSoiree = (jour: number) => {
        const mm = String(mois + 1).padStart(2, '0');
        const jj = String(jour).padStart(2, '0');
        return soirees.find(s => s.dateSoiree === `${annee}.${mm}.${jj}`);
    };

    return (
        <div className="relative isolate pt-[4cqw]">
            <span aria-hidden="true" className="absolute left-[12%] top-0 -z-10 h-[7cqw] w-[5cqw] rounded-full bg-[#F27EB4]" />
            <span aria-hidden="true" className="absolute right-[12%] top-0 -z-10 h-[7cqw] w-[5cqw] rounded-full bg-[#F27EB4]" />
            <div className="relative z-10 flex min-h-[16cqw] items-center justify-between gap-2 rounded-t-[6cqw] border-2 border-sky-500 bg-[#F27EB4] px-[4cqw] text-white">
                <button type="button" aria-label="Mois précédent" onClick={() => changerMois(-1)} className="grid size-[9cqw] min-w-8 place-items-center">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[6cqw] fill-current">
                        <path d="M18 2v20L3 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                </button>
                <h2 className="text-center font-LilitaOne text-[clamp(1.125rem,5.8cqw,2.125rem)] leading-none">{MOIS[mois]} {annee}</h2>
                <button type="button" aria-label="Mois suivant" onClick={() => changerMois(1)} className="grid size-[9cqw] min-w-8 place-items-center">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[6cqw] rotate-180 fill-current">
                        <path d="M18 2v20L3 12Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <div className="mx-px grid grid-cols-5 rounded-b-[6cqw] border-[3cqw] border-t-0 border-[#4227F2] bg-white py-[2cqw] text-center text-[clamp(0.875rem,4cqw,1.5rem)] font-semibold text-[#4227F2]">
                {JOURS.map(j => (
                    <div key={j} className="py-[1cqw] font-LilitaOne text-[clamp(1rem,5.6cqw,2rem)]">{j}</div>
                ))}

                {casesSemaine.map((jour, i) => {
                    const soiree = jour ? trouverSoiree(jour) : undefined;

                    return (
                        <div key={i} className="flex h-[15cqw] items-center justify-center">
                            {jour && (
                                soiree ? (
                                    <Link
                                        to={`/soiree/${soiree.id}`}
                                        aria-label={soiree.titreSoiree}
                                        className="relative flex size-full items-center justify-center"
                                    >
                                        <Etoile className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[18cqw] max-w-[104%] text-[#F27EB4] hover:scale-110 transition-transform" />
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
