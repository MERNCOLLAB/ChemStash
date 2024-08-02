import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
    return (
        <div className={`collapse bg-white1 border ${isOpen ? 'border-blue1' : 'border-gray1'}`}>
        <input type="radio" name="accordion" checked={isOpen} onChange={onClick} />
            <div className="collapse-title flex justify-between text-lg font-medium">
                {title}
                <div className={`duration-1000 ease-out transition-transform ${isOpen ? 'rotate-360' : 'rotate-0'}`}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </div>
            </div>
        <div className="collapse-content text-blue1">
          {content}
        </div>
      </div>
    );
  };

export default AccordionItem;