import VoirPlus from "./VoirPlus";
import solidpin from "../medias/soiree/solidpin.svg";
import soirees from "../data/CardSoiree.json";

const CarteSoiree = () => {
  return (
    <div>
      <section className="flex flex-col gap-12 px-12 py-6">
        {soirees.map((s) => (
          <article
            key={s.titreSoiree}
            className="@container relative mx-auto mt-10 w-full max-w-md"
          >
            {/* Fond bleu (couche 0) */}
            <div className="absolute inset-0 z-0 rounded-[8cqw] bg-[#4227F2]" />

            {/* Bloc blanc (couche 5) */}
            <div className="relative z-[5] mx-[5cqw] mt-[4cqw] flex min-h-[38cqw] flex-col justify-center gap-[1.5cqw] rounded-t-[6cqw] bg-white py-[4cqw] pl-[44cqw] pr-[3cqw]">
              <h3 className="text-[6cqw] font-bold leading-tight text-[#F27EB4]">
                {s.titreSoiree}
              </h3>
              <span className="inline-flex items-center gap-[2cqw] text-[4.5cqw] text-[#4227F2]">
                <img src={solidpin} alt="" className="size-[5cqw] shrink-0" />
                {s.lieuSoiree}
              </span>
              <p className="mt-[2cqw] text-[4.5cqw] font-bold text-[#F27EB4]">
                {s.dateSoiree} – {s.heureSoiree}
              </p>
            </div>

            {/* Image (couche 10) */}
            <img
              src={s.imgSoiree}
              alt={s.titreSoiree}
              className="absolute -left-[-3cqw] -top-[8cqw] z-10 aspect-[3/4] w-[40cqw] -rotate-6 rounded-lg border-4 border-pink-300 object-cover shadow-lg"
            />

            {/* Bas bleu + bouton (couche 20) */}
            <div className="relative z-20 flex justify-center rounded-b-[8cqw] bg-[#4630ec] pb-[5cqw] pt-[4cqw]">
              <VoirPlus id={s.id} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default CarteSoiree;