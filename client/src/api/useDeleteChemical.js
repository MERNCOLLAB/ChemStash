import { useState } from 'react';
import toast from 'react-hot-toast';

const useDeleteChemical = (handleRefresh) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const deleteChemical = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/chemical/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success === false) {
        toast.error('Failed to delete the selected chemical');
        return;
      }
      handleRefresh();
      toast.success('Chemical has been deleted');
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, deleteChemical };
};

export default useDeleteChemical;
