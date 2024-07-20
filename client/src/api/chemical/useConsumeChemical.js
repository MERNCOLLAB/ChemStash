import { useState } from 'react';

const useConsumeChemical = (getChemicalList) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);

  const consumeChemical = async (updateAmount) => {
    const { id, consumptionAmount, updatedSupply, unit, user } = updateAmount;

    try {
      setLoading(true);
      const response = await fetch(`/api/chemical/${id}/consume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, consumptionAmount, updatedSupply, unit, user }),
      });
      const data = await response.json();
      if (data.success === false) {
        setToastMessage('Failed to update the selected chemical');
        setToastType('error');
      }
      getChemicalList();
      setToastMessage('Chemical Amount has been reduced');
      setToastType('success');
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const clearToast = () => {
    setToastMessage(null);
    setToastType(null);
  };

  return { loading, error, consumeChemical, toastMessage, toastType, clearToast };
};

export default useConsumeChemical;
