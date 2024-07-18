import { useState } from 'react';

const useUpdateChemical = (getChemicalList) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);

  const updateChemical = async (currentItem) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/chemical/update/${currentItem._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(currentItem),
      });

      const data = await res.json();
      if (data.success === false) {

        setToastMessage('Failed to update the selected chemical');
        setToastType('error');
        return;
      }

      getChemicalList();
      setToastMessage('Chemical has been updated');
      setToastType('success');
    } catch (error) {

      setError(error);
    }finally{
      setLoading(false);
    }
  };

  const clearToast = () =>{
    setToastMessage(null);
    setToastType(null);
  }
  return { loading, error, updateChemical, toastMessage, toastType, clearToast };
};

export default useUpdateChemical;
