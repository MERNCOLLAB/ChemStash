import { useState } from "react";
import AccordionItem from "./AccordionItem";
import { faqs } from "../constants/faq";

const Accordion = () => {
    const [openIndex, setOpenIndex] = useState(null);
    
    const handleClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
      };

    return (
        <>
        {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          title={faq.title}
          content={<p>{faq.content}</p>}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
      </>
  )
}

export default Accordion;
