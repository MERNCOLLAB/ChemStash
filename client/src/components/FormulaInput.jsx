import useFormatFormula from '../hooks/useFormatFormula';
import { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';

const FormulaInput = ({ value, onChange }) => {
  const { parseInput } = useFormatFormula();
  const [openDialog, setOpenDialog] = useState(false);
  const [inputFormula, setInputFormula] = useState(value);
  const [outputFormula, setOutputFormula] = useState([]);

  useEffect(() => {
    setInputFormula(value);
  }, [value]);

  const showDialog = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    const parsedElements = parseInput(inputFormula);
    setOutputFormula(parsedElements);
    onChange(inputFormula);
  };

  const renderOutputFormula = (outputFormula) => {
    return outputFormula.map((element, index) =>
      element.isSub ? <sub key={index}>{element.text}</sub> : <span key={index}>{element.text}</span>
    );
  };

  return (
    <div className="flex relative my-4">
      <p>{renderOutputFormula(outputFormula)}</p>
      <div className="flex-[0.5]">
        <Button type="button" variant="primary" onClick={showDialog}>
          Type the Formula
        </Button>
      </div>

      {openDialog && (
        <dialog className="w-[90%] flex mx-auto bg-white1 text-gray2" open>
          <Input
            placeholder="Molecular Formula"
            type="text"
            value={inputFormula}
            onChange={(e) => setInputFormula(e.target.value)}
          />
          <Button type="button" variant="primary" onClick={closeDialog}>
            Format
          </Button>
        </dialog>
      )}
    </div>
  );
};

export default FormulaInput;
