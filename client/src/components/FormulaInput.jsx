import React from 'react';
import useFormatFormula from '../hooks/useFormatFormula';
import Input from './Input';
import Button from './Button';

const FormulaInput = ({ value, onChange }) => {
  const { inputFormula, setInputFormula, outputFormula, openDialog, showDialog, closeDialog } = useFormatFormula(
    value,
    onChange
  );

  const renderOutputFormula = (outputFormula) => {
    return outputFormula.map((element, index) =>
      element.isSub ? <sub key={index}>{element.text}</sub> : <span key={index}>{element.text}</span>
    );
  };

  return (
    <div className="flex flex-row w-full justify-evenly items-center gap-2 relative my-4">
      <p>{renderOutputFormula(outputFormula)}</p>
      <div className="flex-[0.5]">
        <Button type="form" onClick={showDialog}>
          Type the Formula
        </Button>
      </div>

      {openDialog && (
        <dialog className="w-[90%] flex mx-auto bg-sky-500 text-white" open>
          <Input
            placeholder="Molecular Formula"
            type="text"
            value={inputFormula}
            onChange={(e) => setInputFormula(e.target.value)}
          />
          <Button onClick={closeDialog}>Format</Button>
        </dialog>
      )}
    </div>
  );
};

export default FormulaInput;
