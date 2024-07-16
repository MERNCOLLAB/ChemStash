const useFormatFormula = () => {
  const parseInput = (input) => {
    if (!input) return [];

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
    parseInput,
  };
};

export default useFormatFormula;
