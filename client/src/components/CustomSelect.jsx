import Select from 'react-select';
import { selectStyle } from '../helpers/selectStyle';

function CustomSelect({
  placeholder,
  label,
  value,
  options,
  onChange,
  validation,
  isMulti,
  closeMenuOnSelect,
  components,
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray2 mb-2">{label}</label>
      <Select
        className={`${isMulti ? 'w-[90%]' : 'w-[310px]'} mb-1`}
        placeholder={placeholder}
        value={value}
        options={options}
        onChange={onChange}
        styles={selectStyle}
        isMulti={isMulti}
        closeMenuOnSelect={closeMenuOnSelect}
        components={components}
        isClearable
      />
      <p className="text-xs text-gray1">{validation}</p>
    </div>
  );
}

export default CustomSelect;
