export function Input({ type, placeholder, id, onChange, defaultValue }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      className="bg-slate-900 p-3 border"
    />
  );
}
