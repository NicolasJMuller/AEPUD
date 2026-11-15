import Faq from "../components/Faq";
import LogoAEPUDfaq from "../../src/medias/Logo/Logo_bleu_faq.png";
import BoiteaIdees from "../components/BoiteaIdees";
export default function Info() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-LilitaOne text-[#F27EB4] text-5xl flex justify-center items-center pb-6">FAQ de l'<img src={LogoAEPUDfaq} alt="Logo AEPUD" /></h1>
      <Faq />
      <h1 className="font-LilitaOne text-[#4227F2] text-5xl pt-9 ml-6">Boite à idées</h1>
      <BoiteaIdees />
    </div>

  );
}