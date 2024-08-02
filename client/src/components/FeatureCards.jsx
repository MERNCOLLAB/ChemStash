const FeatureCards = ({ icon, iconColor = "#0072b2", iconSize = 60, text, highlightText }) => {
  return (
    <div className="flex flex-col items-center gap-2 w-[70%] h-full border-2 rounded-lg shadow-md p-4 
    hover:bg-sky-200 hover:text-slate-800 duration-500 ease-out">
    <div style={{ color: iconColor, fontSize: iconSize }} className="hover:scale-110 duration-500 ease-out">
      {icon}
    </div>
    <p className="text-center text-sm leading-tight text-balance">
      {text} <span className="text-blue1">{highlightText}</span>
    </p>
  </div>
  )
}

export default FeatureCards;
