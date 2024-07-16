import React from 'react';
import useFormatFormula from './useFormatFormula';

const ChemicalFormula = ({ formula }) => {
  const { parseInput } = useFormatFormula();
  const parsedFormula = parseInput(formula);

  const renderFormula = (elements) => {
    return elements.map((element, index) =>
      element.isSub ? <sub key={index}>{element.text}</sub> : <span key={index}>{element.text}</span>
    );
  };

  return <>{renderFormula(parsedFormula)}</>;
};

export default ChemicalFormula;
