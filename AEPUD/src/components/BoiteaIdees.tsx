import { useState } from "react";

const DASH_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='28'%3E%3Crect x='0' y='26' width='6' height='2' fill='%23F472B6'/%3E%3C/svg%3E")`;

export default function BoiteaIdees() {
    const [name, setName] = useState("");
    const [suggestions, setSuggestions] = useState("");
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        try {
            // 👉 remplace par ton appel API
            // await fetch("/api/suggestions", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ name, suggestions }),
            // });
            setStatus("sent");
            setName("");
            setSuggestions("");
        } catch {
            setStatus("error");
        }
    };
    return (
        <>
            <p className="text-base text-[#4A26F0] font-InterRegular mt-2 mx-6">
                Tu es adhérent•e et tu as une suggestion ? Il ne te reste plus qu’à écrire ton nom, prénom et ton idée ci-dessous.
            </p>

            <form onSubmit={handleSubmit} className="relative mx-auto mt-4 w-full overflow-hidden">
                {/* Partie haute : enveloppe bleue + feuille */}
                <div className="relative h-[290px]">
                    {/* Cadre bleu autour de la feuille */}
                    <div className="absolute inset-x-[29px] top-[14px] bottom-0 rounded-t-[24px] bg-[#4A26F0]" />

                    {/* Épaules inclinées */}
                    <div
                        className="absolute inset-x-0 bottom-0 h-[75px] bg-[#4A26F0]"
                        style={{
                            clipPath:
                                "polygon(12% 23%, 100% 23%, 100% 94%, 100% 100%, 0 100%, 0 46%)",
                        }}
                    />

                    {/* Feuille blanche (coupée en bas) */}
                    <div className="absolute inset-x-[43px] top-[26px] h-[242px] overflow-hidden rounded-t-2xl bg-white px-[18px] pt-4">
                        <label className="block">
                            <span className="text-xs uppercase tracking-wide text-[#4A26F0]">
                                Nom prénom
                            </span>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-2 block h-7 w-full border-b-2 border-dashed border-[#F472B6] bg-transparent text-sm text-[#4A26F0] outline-none"
                            />
                        </label>

                        <label className="mt-4 block">
                            <span className="text-xs uppercase tracking-wide text-[#4A26F0]">
                                Suggestions
                            </span>
                            <textarea
                                value={suggestions}
                                onChange={(e) => setSuggestions(e.target.value)}
                                required
                                rows={7}
                                className="mt-2 block h-[170px] w-full resize-none bg-transparent text-sm text-[#4A26F0] outline-none"
                                style={{
                                    lineHeight: "20px",
                                    backgroundAttachment: "local",
                                    backgroundImage: DASH_BG,
                                    backgroundSize: "8px 20px",
                                }}
                            />
                        </label>
                    </div>

                    {/* Oreilles roses */}
                    <span className="absolute right-0 top-[252px] h-[22px] w-[18px] rounded-r-full bg-[#F27EB4]" />
                    <span className="absolute left-0 top-[252px] h-[22px] w-[18px] rounded-l-full bg-[#F27EB4]" />
                </div>

                {/* Poche rose + bouton */}
                <div className="relative z-20 min-h-[137px] bg-[#F27EB4] pl-6 pr-12 pt-4">
                    <div className="flex items-center justify-end gap-3">
                        {status === "sent" && (
                            <span className="text-xs font-medium text-[#4A26F0]">C'est dans la boîte !</span>
                        )}
                        {status === "error" && (
                            <span className="text-xs font-medium text-[#4A26F0]">Erreur, réessaie.</span>
                        )}
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            style={{ fontFamily: '"Lilita One", sans-serif' }}
                            className="flex items-center gap-3 rounded-lg bg-[#4A26F0] px-4 py-2 text-sm uppercase tracking-wide text-white disabled:opacity-60"
                        >
                            Envoyer
                            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
                                <path d="M2 21 23 12 2 3v7l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}