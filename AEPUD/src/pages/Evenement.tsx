import { useState } from "react";
import Calendrier from "../components/Calendrier";
import CarteSoiree from "../components/CarteSoiree";
import Etoile from "../components/Etoile";

export default function Evenement() {
    const [date, setDate] = useState(() => new Date());

    return (
        <section className="mx-auto w-full max-w-[624px]">
            <div className="@container px-[4%] pt-4">
                <h1 className="mx-auto mb-[3cqw] w-[92%]">
                    <img
                        src={`${import.meta.env.BASE_URL}Medias/Soiree/titre.png`}
                        alt="Ne ratez plus une soirée de l’AEPUD"
                        width={1305}
                        height={365}
                        className="block h-auto w-full"
                    />
                </h1>
                <Calendrier date={date} setDate={setDate} />
                <div className="mx-auto mb-[4cqw] mt-[5cqw] flex w-[90%] items-start gap-[2.5cqw] text-[#4227F2]">
                    <Etoile className="aspect-square w-[11cqw] shrink-0 text-[#F27EB4]" />
                    <p className="font-InterRegular text-[clamp(1rem,4.5cqw,1.625rem)] leading-[1.08]">
                        Une étoile sur une date ? <br /> Clique dessus pour découvrir l’événement.
                    </p>
                </div>
            </div>
            <CarteSoiree date={date} />
        </section>
    );
}
