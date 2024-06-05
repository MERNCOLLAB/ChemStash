const FormatFormula = ({ value }) => {
  const parts = value.split(/(<sub>.*?<\/sub>|<br\s*\/>)/);
  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('<sub>') && part.endsWith('</sub>')) {
          const subPart = part.slice(5, -6);
          return <sub key={index}>{subPart}</sub>;
        } else if (part === '<br>' || part === '<br />') {
          return <br key={index} />;
        }
        return part;
      })}
    </span>
  );
};

export default FormatFormula;
