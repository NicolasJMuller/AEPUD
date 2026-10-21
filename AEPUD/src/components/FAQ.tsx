import { useState } from "react";
import AccordeonItem from "./AccordeonItem";
import faq from "../data/Accordeon.json";

const Accordeon = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="mx-auto max-w-2xl">
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