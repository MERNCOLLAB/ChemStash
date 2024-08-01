

const TextArea = ({id,label,value,onChange,validation}) => {
  return(
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray2 mb-2" htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
       className="min-w-fit min-h-20 resize-y rounded-lg indent-2 
       mb-1 focus:outline-none focus:ring-0 focus:border-blue0 
       border border-solid  caret-blue0 p-1"
      />
      <p className="text-xs text-gray1 w-fit">{validation}</p>
    </div>
  )
}

export default TextArea;
