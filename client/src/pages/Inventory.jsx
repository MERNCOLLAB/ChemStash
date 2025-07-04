import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// UI and Components
import Drawer from '../ui/Drawer';
import { UpdateChemicalForm, DeleteChemicalForm, ConsumeChemicalForm, AddChemicalForm } from '../ui';
import MTable from '../components/MTable';
import { BigSpinner } from '../components';

// Table Configurations
import useFormatFormula from '../hooks/chemical/useFormatFormula';
import { inventoryColumns } from '../configs/InventoryColumn';
import { paginationOptions } from '../helpers/TableConfig';

// Hooks
import useDrawer from '../hooks/chemical/useDrawer';
import useGetChemical from '../api/chemical/useGetChemical';


function Inventory() {
  const { lists, getChemicalList, loading, error } = useGetChemical();
  const {
    currentItem,
    drawerType,
    drawerOpen,
    handleConsume,
    handleAdd,
    handleUpdate,
    handleDelete,
    handleDrawerClose,
  } = useDrawer(lists);

  const currentUser = useSelector((state) => state.user.currentUser);
  const { parseInput } = useFormatFormula();
  const columns = inventoryColumns(currentUser,parseInput, handleConsume, handleUpdate, handleDelete);

  useEffect(() => {
    getChemicalList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <Drawer isOpen={drawerOpen} onClose={handleDrawerClose}>
        {drawerType === 'add' ? (
          <AddChemicalForm 
          getChemicalList={getChemicalList}
          handleDrawerClose={handleDrawerClose} 
          />
        ) : drawerType === 'update' ? (
          <UpdateChemicalForm
            item={currentItem}
            getChemicalList={getChemicalList}
            handleDrawerClose={handleDrawerClose}
          />
        ) : drawerType === 'delete' ? (
          <DeleteChemicalForm 
            item={currentItem} 
            getChemicalList={getChemicalList}
            handleDrawerClose={handleDrawerClose}
          />
        ) : drawerType === 'consume' ? (
          <ConsumeChemicalForm
            item={currentItem}
            getChemicalList={getChemicalList}
            handleDrawerClose={handleDrawerClose}
          />
        ) : null}
      </Drawer>
      {loading ? (
        <div className="flex justify-center items-center  min-h-[calc(100vh-80px)]">
          <BigSpinner />
        </div>
      ) : error ? (
        <div>Something went wrong, {error.message}</div>
      ) : (
        <MTable
          type={drawerType}
          currentUser={currentUser}
          data={lists}
          columns={columns}
          options={paginationOptions}
          handleAdd={handleAdd}
        />
      )}
    </div>
  );
}

export default Inventory;
