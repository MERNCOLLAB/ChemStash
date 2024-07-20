import { useEffect } from 'react';
import useGetChemical from '../api/chemical/useGetChemical';

const DashboardCard = ({ query, title, icon }) => {
  const { lists, loading, error, getChemicalList } = useGetChemical(query);

  useEffect(() => {
    getChemicalList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="w-full min-h-24 bg-indigo1/50 animate-pulse " />;
  }

  if (error) {
    return <div className="flex justify-center items-center">Something went wrong, {error.message}</div>;
  }

  return (
    <div className="border bg-white1 p-4 flex items-center gap-2  flex-grow">
      <div className="text-4xl">{icon}</div>
      <div className="group min-w-fit relative">
        <p>{title}</p>
        <p className="font-bold text-2xl">{lists.length}</p>
        <ul className="group-hover:block hidden absolute">
          {lists.map((chemical) => (
            <li key={chemical._id}>
              <div>Name: {chemical.name}</div>
              <div>Supply: {chemical.supply}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardCard;
