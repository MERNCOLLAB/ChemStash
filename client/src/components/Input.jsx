function Input({ type, value, placeholder, id, onChange, defaultValue }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      className="flex-1 w-full bg-slate-900 p-3 border"
    />
  );
}

export default Input;
