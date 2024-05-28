

export function Input({ classStyle,
    type, placeholder, id, onChange, defaultValue}) {
  return (
      <input
          id={id}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={onChange}
          className={
              `${!classStyle ? "bg-sky-800 text-white/50" :
                  classStyle === "authForm" ? "bg-slate-900" :
                    ""} p-3 border`}
      />
  )
}
