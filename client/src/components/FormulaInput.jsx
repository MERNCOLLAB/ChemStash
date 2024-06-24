import React from 'react';
import useFormatFormula from '../hooks/useFormatFormula';

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
        <button className="bg-sky-500 p-1  rounded-lg text-sm text-white" onClick={showDialog}>
          Type the Formula
        </button>
      </div>

      {openDialog && (
        <dialog className="w-[90%] flex mx-auto bg-sky-500 text-white" open>
          <input
            className="flex-1 bg-slate-900 text-white p-3 border"
            placeholder="Molecular Formula"
            type="text"
            value={inputFormula}
            onChange={(e) => setInputFormula(e.target.value)}
          />
          <button
            className="flex-[0.5] indent-2 text-sm duration-500 ease-out hover:bg-white hover:text-sky-500"
            onClick={closeDialog}
          >
            Format
          </button>
        </dialog>
      )}
    </div>
  );
};

export default FormulaInput;
