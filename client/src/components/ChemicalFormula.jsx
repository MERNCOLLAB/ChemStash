import useFormatFormula from '../hooks/chemical/useFormatFormula';

const ChemicalFormula = ({ formula }) => {
  const { parseInput } = useFormatFormula();

  const renderFormula = (elements) => {
    return elements.map((element, index) =>
      element.isSub ? <sub key={index}>{element.text}</sub> : <span key={index}>{element.text}</span>
    );
  };

  return <>{renderFormula(parseInput(formula))}</>;
};

export default ChemicalFormula;
