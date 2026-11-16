import arrowWhiteRight from "../medias/Icons/arrowWhiteRight.svg";

type Props = {
    question: string;
    reponse: string;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
};

const AccordeonItem = ({ question, reponse, index, isOpen, onToggle }: Props) => {
    const isPink = index % 2 === 0;

    return (
        <div>
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className={`flex w-full items-center gap-4 px-6 py-6 text-left text-whitetext-lg ${
                    isPink ? "bg-[#F27EB4]" : "bg-[#4227F2]"
                }`}
            >
                <img
                    src={arrowWhiteRight}
                    alt=""
                    className={`w-6 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-90" : "rotate-0"
                    }`}
                />
                <span className="text-white text-xl leading-6">{question}</span>
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <p className="px-8 py-4 text-lg font-InterRegular text-[#4227F2]">{reponse}</p>
                </div>
            </div>
        </div>
    );
};

export default AccordeonItem;
