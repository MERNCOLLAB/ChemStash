const ViewChemicalData = ({ label, children, gridColsClass }) => {
  return (
    <div className={`grid ${gridColsClass} items-center gap-1 my-1`}>
      <label className="text-base font-semibold text-gray2">{label}</label>
      <p>{children}</p>
    </div>
  );
};

export default ViewChemicalData;
