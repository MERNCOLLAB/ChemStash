const FeatureCards = ({ icon, iconColor = "#64748B", iconSize = 60, text, highlightText }) => {
  return (
    <div className="flex flex-col items-center gap-2 w-[80%] h-full border-2 rounded-lg shadow-md p-4 
    hover:bg-sky-200 hover:text-slate-800 duration-500 ease-out">
    <div style={{ color: iconColor, fontSize: iconSize }} className="hover:scale-110 duration-500 ease-out">
      {icon}
    </div>
    <p className="text-center text-base leading-tight text-balance p-2">
      {text} <span className="text-gray2 font-semibold">{highlightText}</span>
    </p>
  </div>
  )
}

export default FeatureCards;
