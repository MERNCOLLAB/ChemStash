import { useEffect } from 'react';
import useGetChemical from '../api/useGetChemical';

const ChemicalRunningLow = () => {
  const { lists, loading, error, getChemicalList } = useGetChemical('low-amount');

  useEffect(() => {
    getChemicalList();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: </p>;
  }

  if (!lists) return;
  return (
    <div className="group relative">
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
