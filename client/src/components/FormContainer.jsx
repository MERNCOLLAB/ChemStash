const FormContainer = ({ children, gridNumber = '3' }) => {
  return <div className={`grid grid-cols-${gridNumber} gap-4`}>{children}</div>;
};

export default FormContainer;
