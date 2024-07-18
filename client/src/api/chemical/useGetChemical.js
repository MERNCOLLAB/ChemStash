import { useState } from 'react';


const useGetChemical = (query = '') => {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);

  const getChemicalList = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/chemical/list/${query}`);
      if (!response.ok) {
        setToastMessage('Failed to fetch the chemical inventory data');
        setToastType('error');
      }
      const data = await response.json();
      const transformedData = data.map((item) => ({
        ...item,
        dateReceived: item.dateReceived.split('T')[0].replace(/-/g, '/'),
        expiryDate: item.expiryDate.split('T')[0].replace(/-/g, '/'),
      }));
      setLists(transformedData);
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
  return { loading, error, lists, getChemicalList, toastMessage, toastType, clearToast };
};
export default useGetChemical;
