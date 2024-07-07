import { useState } from 'react';
import useGetChemical from '../api/useGetChemical';

const ChemicalRunningLow = () => {
  const [refreshList, setRefreshList] = useState(false);
  const { lists, loading, error } = useGetChemical(refreshList, 'low-amount');
  const handleRefresh = () => {
    setRefreshList(!refreshList);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: </p>;
  }

  return (
    <div className="group relative">
      <button className="hidden" onClick={handleRefresh}>
        Refresh List
      </button>
      <p>Chemicals Running Low</p>
      <p className="font-bold text-4xl"> {lists.length}</p>

      <ul className=" group-hover:block hidden absolute">
        {lists.map((chemical) => (
          <li key={chemical._id}>
            <div>Name: {chemical.name}</div>
            <div>Supply: {chemical.supply}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChemicalRunningLow;
