const Select = ({ id, onChange, disabledValue, options }) => {
  const renderOptions = () => {
    switch (id) {
      case 'role':
        return options.map((opt, index) => (
          <option className="bg-slate-900" key={index} value={opt}>
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </option>
        ));
      default:
        return options.map((opt, index) => (
          <option className="bg-slate-900" key={index} value={opt}>
            {opt}
          </option>
        ));
    }
  };

  return (
    <select
      className="bg-slate-900 p-3 border cursor-pointer text-slate-400"
      id={id}
      defaultValue=""
      onChange={onChange}
    >
      <option className="bg-slate-900" value="" disabled>
        {disabledValue}
      </option>
      {renderOptions()}
    </select>
  );
};

export default Select;
