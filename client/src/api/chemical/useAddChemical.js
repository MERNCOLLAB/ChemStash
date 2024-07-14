import { useState } from 'react';
import toast from 'react-hot-toast';

const useAddChemical = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const addChemical = async (formData) => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/chemical/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        toast.error('Failed to add the chemical');
      }
      const data = await res.json();

      setLoading(false);

      toast.success(data.message);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, addChemical };
};

export default useAddChemical;
