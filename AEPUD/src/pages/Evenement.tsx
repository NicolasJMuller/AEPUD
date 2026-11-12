import Calendrier from "../components/Calendrier";
import CarteSoiree from "../components/CarteSoiree";

export default function Evenement() {
    return (
        <main>
            <h1 className="text-5xl font-LilitaOne text-[#4227F2] mb-4 text-center">Ne ratez plus une soirée de l’</h1>
            <Calendrier />
            <CarteSoiree />
        </main>


    );
}