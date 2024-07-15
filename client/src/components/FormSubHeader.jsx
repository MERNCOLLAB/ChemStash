const FormSubHeader = ({ title, subtitle }) => {
  return (
    <div className="text-gray1 my-5">
      <h3 className="pb-1 text-base font-semibold">{title}</h3>
      <p className="text-xs">{subtitle}</p>
    </div>
  );
};

export default FormSubHeader;
