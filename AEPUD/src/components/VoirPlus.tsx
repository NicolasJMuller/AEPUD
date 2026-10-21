import { useNavigate } from "react-router-dom";

type Props = { id: number };
const VoirPlus = ({ id }: Props) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/soiree/${id}`)}
      className="rounded-full border-2 border-white px-6 py-3 text-white"
    >
      Voir Plus
    </button>
  );
};

export default VoirPlus;