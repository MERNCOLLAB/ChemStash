

const SectionLayout = ({title,pageContent,imagePath, gridClassName,gridSpan}) => {
  return (
    <div className="w-full h-auto mx-auto">
        <div className="flex relative w-full justify-end">
            <div className={`left-0 top-1/2 absolute ${gridClassName ? gridClassName : ''}`}>
                <h1 className={`font-bold text-4xl mb-4 ${gridSpan ? gridSpan : ''}`}>{title}</h1>
                {pageContent}
            </div>
            <div className="mt-2">
                <img src={imagePath} alt={`${imagePath}-image`} />
            </div>
        </div>
    </div>
  )
}

export default SectionLayout;
