const FormContainer = ({ children, gridColsClass = 'grid-cols-3' }) => {
  return <div className={`grid ${gridColsClass} mt-2 gap-4`}>{children}</div>;
};

export default FormContainer;
