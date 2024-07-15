const FormContainer = ({ firstRowInput, secondRowInput }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex justify-start items-center gap-5">{firstRowInput}</div>
      {secondRowInput && <div className="flex justify-start items-center gap-5">{secondRowInput}</div>}
      <hr className="bg-gray1 mt-5" />
    </div>
  );
};

export default FormContainer;
