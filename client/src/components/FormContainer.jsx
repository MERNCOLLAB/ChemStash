const FormContainer = ({ children, gridNumber = '3' }) => {
  return <div className={`grid grid-cols-${gridNumber} mt-2 gap-4`}>{children}</div>;
};

export default FormContainer;
