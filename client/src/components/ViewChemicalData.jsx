const ViewChemicalData = ({ label, children }) => {
  return (
    <div className="grid grid-cols-2 items-center gap-1 ">
      <label className="font-semibold text-lg">{label}</label>
      <p className="">{children}</p>
    </div>
  );
};

export default ViewChemicalData;
