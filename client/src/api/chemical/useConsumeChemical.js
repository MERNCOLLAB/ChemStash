import { useState } from 'react';

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
        body: JSON.stringify({ amount, unit, user }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
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
