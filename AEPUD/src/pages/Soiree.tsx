import { useParams, Link } from "react-router-dom";
import soirees from "../data/CardSoiree.json";

export default function Soiree() {
    const { id } = useParams();
    const soiree = soirees.find((s) => s.id === Number(id));
    if (!soiree) {
        return (
            <div className="p-6">
                <p>Soirée introuvable.</p>
                <Link to="/evenement" className="underline">Retour</Link>
            </div>
        );
    }

    return (
        <div>

            <div className="absolute -z-10 top-33 [clip-path:polygon(0_28%,100%_0%,100%_100%,0_81%)] bg-[#4227F2] w-full h-100" />
            <article className="flex flex-col gap-4 p-6">
                <Link to="/evenement" className="text-sm underline">Retour</Link>
                <img
                    src={soiree.imgSoiree}
                    alt={soiree.titreSoiree}
                    className="w-30 rounded-xl object-cover -z-11 -rotate-7 shadow-lg"
                />
                <h1 className="text-2xl font-bold">{soiree.titreSoiree}</h1>
                <p>{soiree.lieuSoiree}</p>
                <p>{soiree.dateSoiree} à {soiree.heureSoiree}</p>
            </article>
        </div>
    );
}
