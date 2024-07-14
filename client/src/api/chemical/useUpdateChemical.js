import { useState } from 'react';
import toast from 'react-hot-toast';

const useUpdateChemical = (getChemicalList, handleDrawerClose) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const updateItem = async (currentItem) => {
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
        setLoading(false);
        toast.error('Failed to update the selected chemical');
        return;
      }

      getChemicalList();
      handleDrawerClose();
      toast.success('Chemical successfully updated');
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  return { loading, error, updateItem };
};

export default useUpdateChemical;
