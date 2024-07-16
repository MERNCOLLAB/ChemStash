import { useState } from 'react';
import toast from 'react-hot-toast';
const useConsumeChemical = () => {
  const [loading, setLoading] = useState(false);
  const consumeChemical = async (update, getChemicalList) => {
    const { id, amount, unit, user } = update;

    try {
      setLoading(true);
      const response = await fetch(`/api/chemical/${id}/consume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, amount, unit, user }),
      });

      if (!response.ok) {
        toast.error('Failed to update chemical amount');
        throw new Error('Network response was not ok');
      }
      toast.success('Chemical amount reduced');
      getChemicalList();
    } catch (error) {
      console.error('Error consuming chemical:', error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, consumeChemical };
};

export default useConsumeChemical;
