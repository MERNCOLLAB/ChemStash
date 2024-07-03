import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useGetChemical = () => {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getChemicalList = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/chemical/list`);
        if (!response.ok) {
          toast.error('Failed to fetch the Chemical Lists');
        }
        const data = await response.json();
        const transformedData = data.map((item) => ({
          ...item,
          purchaseDate: item.purchaseDate.split('T')[0].replace(/-/g, '/'),
          expiryDate: item.expiryDate.split('T')[0].replace(/-/g, '/'),
        }));
        setLists(transformedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    if (lists) {
      getChemicalList();
    }
  }, []);
  return { loading, error, lists };
};
export default useGetChemical;
