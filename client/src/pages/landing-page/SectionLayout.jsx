

const SectionLayout = ({title,pageContent,imagePath, gridClassName,gridSpan}) => {
  return (
    <div className="w-full h-full mx-auto">
        <div className="flex relative w-full justify-end">
            <div className={`left-0 top-1/2 absolute ${gridClassName}`}>
                <h1 className={`font-bold my-2 ${gridSpan}`}>{title}</h1>
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
