function Input({ type, label, value, placeholder, id, onChange, defaultValue, validation }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray2 mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        className="rounded-lg indent-2 bg-transparent border-gray1 h-10 text-base 
        mb-1 w-[279px] focus:outline-none focus:ring-0 focus:border-indigo0 border border-solid"
      />
      <p className="text-xs text-gray1">{validation}</p>
    </div>
  );
}

export default Input;
