import { useState, useEffect } from 'react';

const useFormatFormula = (initialValue, onChange) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [inputFormula, setInputFormula] = useState(initialValue);
  const [outputFormula, setOutputFormula] = useState([]);

  useEffect(() => {
    setInputFormula(initialValue);
  }, [initialValue]);

  const showDialog = () => {
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    const parsedElements = parseInput(inputFormula);
    setOutputFormula(parsedElements);
    onChange(inputFormula);
  };

  const parseInput = (input) => {
    const regex = /(\d+)/g;
    const elements = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(input)) !== null) {
      const { index } = match;
      if (index > lastIndex) {
        elements.push({ text: input.slice(lastIndex, index), isSub: false });
      }
      elements.push({ text: match[0], isSub: true });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < input.length) {
      elements.push({ text: input.slice(lastIndex), isSub: false });
    }
    return elements;
  };

  return {
    showDialog,
    closeDialog,
    openDialog,
    inputFormula,
    setInputFormula,
    outputFormula,
  };
};

export default useFormatFormula;
