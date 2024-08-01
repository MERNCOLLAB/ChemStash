import { useEffect, useState } from 'react';
import useGetChemical from '../api/chemical/useGetChemical';
import Drawer from '../ui/Drawer';
import Button from './Button';

const DashboardCard = ({ query, title, icon, bg }) => {
  const { lists, loading, error, getChemicalList } = useGetChemical(query);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    getChemicalList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  if (loading) {
    return <div className="w-full min-h-24 bg-blue1/50 animate-pulse " />;
  }

  if (error) {
    return <div className="flex justify-center items-center">Something went wrong, {error.message}</div>;
  }

  return (
    <div
      onClick={handleDrawerToggle}
      className={`${bg} p-4 flex items-center gap-2 flex-grow text-white0 rounded-md shadow-md cursor-pointer`}
    >
      <div className="text-4xl text-white0">{icon}</div>
      <div className="group min-w-fit relative">
        <p className="font-bold text-2xl w-fit ">{lists.length}</p>
        <small>{title}</small>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={handleDrawerToggle}>
        <div className={`bg-white0 h-screen min-h-full z-50 text-gray2 p-7 max-w-lg w-full`}>
          <h1 className="text-md font-semibold">{title}</h1>
          <hr className="bg-gray1 my-5" />
          {lists.map((chemical) => (
            <div key={chemical._id} className="grid grid-cols-2  items-center align-middle">
              <div className="text-sm font-semibold ">{chemical.name}</div>
              <div className="text-center">{chemical.supply}</div>
            </div>
          ))}
          <hr className="bg-gray1 my-5" />

          <Button isFull type="button" variant="secondary" onClose={handleDrawerToggle}>
            Close
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default DashboardCard;
