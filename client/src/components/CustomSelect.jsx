import Select from 'react-select';
import { selectStyle } from '../helpers/selectStyle';

function CustomSelect({ placeholder, label, value, options, onChange, validation }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray2 mb-2">{label}</label>
      <Select
        className="w-[310px] mb-1"
        placeholder={placeholder}
        value={value}
        options={options}
        onChange={onChange}
        styles={selectStyle}
        isClearable
      />
      <p className="text-xs text-gray1">{validation}</p>
    </div>
  );
}

export default CustomSelect;
