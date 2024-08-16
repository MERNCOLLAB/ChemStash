const SectionLayout = ({ title, id, pageContent, imagePath, gridClassName, gridSpan }) => {
  return (
    <div className="w-full h-auto mx-auto">
      <div id={id} className="flex relative w-full md:justify-end">
        <div  className={`left-0 top-1/4 md:absolute z-50 ${gridClassName ? gridClassName : ''}`}>
          <h1 className={`font-bold text-4xl mb-4 ${gridSpan ? gridSpan : ''}`}>{title}</h1>
          {pageContent}
        </div>
        <div className="mt-2 md:relative absolute right-0 top-0">
          <img src={imagePath} alt={`${imagePath}-image`} />
        </div>
      </div>
    </div>
  );
};

export default SectionLayout;
