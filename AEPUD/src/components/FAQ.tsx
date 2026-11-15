import { useState } from "react";
import AccordeonItem from "./AccordeonItem";
import faq from "../data/Accordeon.json";

const Accordeon = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="font-LilitaOne">
            {faq.map((item, i) => (
                <AccordeonItem
                    key={item.question}
                    index={i}
                    question={item.question}
                    reponse={item.reponse}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
            ))}
        </div>
    );
};

export default Accordeon;