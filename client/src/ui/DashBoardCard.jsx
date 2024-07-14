import useGetChemical from '../api/chemical/useGetChemical';
import { useEffect } from 'react';
const DashboardCard = ({ query, title }) => {
  const { lists, loading, error, getChemicalList } = useGetChemical(query);

  useEffect(() => {
    getChemicalList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!lists) return null;

  return (
    <div className="group relative">
      <p>{title}</p>
      <p className="font-bold text-4xl">{lists.length}</p>
      <ul className="group-hover:block hidden absolute">
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

export default DashboardCard;
