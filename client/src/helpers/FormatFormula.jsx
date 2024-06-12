const FormatFormula = ({ formula }) => {
  const parts = formula.replace(/<\/?p>/g, '').split(/(<sub>.*?<\/sub>|<br\s*\/>)/);

  return (
    <span>
      {parts.map((part, idx) => {
        if (part.startsWith('<sub>') && part.endsWith('</sub>')) {
          const subPart = part.slice(5, -6);
          return (
            <sub key={idx} className=" p-[0.15em] leading-none">
              {subPart}
            </sub>
          );
        } else if (part === '<br>' || part === '<br />') {
          return <br key={idx} />;
        }
        return part;
      })}
    </span>
  );
};

export default FormatFormula;
