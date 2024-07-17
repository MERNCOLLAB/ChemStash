import { useState } from 'react';


const useDeleteChemical = (getChemicalList) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);
  const deleteChemical = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/chemical/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success === false) {
        setToastMessage('Failed to delete the selected chemical');
        setToastType('error');
        return;
      }
      getChemicalList();
      setToastMessage('Chemical has been deleted');
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
  return {loading, error, deleteChemical, toastMessage, toastType, clearToast};
};

export default useDeleteChemical;
