import { useState } from 'react';

const useAddChemical = (getChemicalList) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);

  const addChemical = async (chemicalData) => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/chemical/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chemicalData),
      });

      const data = await res.json();
      if (data.success === false) {
        setToastMessage('Failed to add the chemical');
        setToastType('error');
        return;
      }
      
      getChemicalList();
      setToastMessage('Chemical has been added');
      setToastType('success');
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const clearToast = () =>{
    setToastMessage(null);
    setToastType(null);
  }

  return { loading, error, addChemical, toastMessage, toastType, clearToast };
};

export default useAddChemical;
