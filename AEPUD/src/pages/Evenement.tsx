import { useState } from "react";
import Calendrier from "../components/Calendrier";
import CarteSoiree from "../components/CarteSoiree";
import Etoile from "../components/Etoile";

export default function Evenement() {
    const [date, setDate] = useState(new Date(2026, 9, 1));

    return (
        <main>
            <img src="/Medias/Soiree/titre.png" alt="Ne ratez plus une soirée de l'AEPUD" />
            <Calendrier date={date} setDate={setDate} />
            <div className="text-center text-[#4227F2] flex m-auto align-center justify-center w-5/6">
                <Etoile className="mx-auto my-4 w-16 h-16 text-[#F27EB4]" />
                <p className="mx-auto my-4">Une étoile sur une date ? <br /> Clique dessus pour découvrir l’évènement.</p>
            </div>
            <CarteSoiree date={date} />
        </main>
    );
}