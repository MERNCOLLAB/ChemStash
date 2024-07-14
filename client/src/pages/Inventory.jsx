// Components
import Drawer from '../ui/Drawer';
import { useEffect } from 'react';
import { UpdateChemicalForm, DeleteChemicalForm, ConsumeChemicalForm } from '../ui';
import { MTable } from '../components';

// Table Configurations
import useFormatFormula from '../hooks/chemical/useFormatFormula';
import { inventoryColumns } from '../configs/InventoryColumn';
import { paginationOptions, getMuiTheme } from '../helpers/TableConfig';

// Hooks
import useDrawer from '../hooks/chemical/useDrawer';
import useGetChemical from '../api/chemical/useGetChemical';
import useUpdateChemical from '../api/chemical/useUpdateChemical';
import useDeleteChemical from '../api/chemical/useDeleteChemical';

import { useSelector } from 'react-redux';
function Inventory() {
  const { lists, getChemicalList, loading, error } = useGetChemical();
  const { currentItem, drawerType, drawerOpen, handleConsume, handleUpdate, handleDelete, handleDrawerClose } =
    useDrawer(lists);
  const { loading: updateLoading, updateItem } = useUpdateChemical(getChemicalList, handleDrawerClose);
  const { deleteChemical } = useDeleteChemical(getChemicalList, handleDrawerClose);
  const currentUser = useSelector((state) => state.user.currentUser);
  const { parseInput } = useFormatFormula();
  const renderFormula = (formula) => {
    return formula.map((element, index) =>
      element.isSub ? <sub key={index}>{element.text}</sub> : <span key={index}>{element.text}</span>
    );
  };
  const columns = inventoryColumns(currentUser, handleConsume, handleUpdate, handleDelete, parseInput, renderFormula);

  useEffect(() => {
    getChemicalList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col  ">
      <Drawer isOpen={drawerOpen} onClose={handleDrawerClose}>
        {drawerType === 'update' ? (
          <UpdateChemicalForm item={currentItem} handleUpdate={updateItem} loading={updateLoading} />
        ) : drawerType === 'delete' ? (
          <DeleteChemicalForm item={currentItem} onDelete={deleteChemical} getMuiTheme={getMuiTheme} />
        ) : drawerType === 'consume' ? (
          <ConsumeChemicalForm item={currentItem} getChemicalList={getChemicalList} />
        ) : null}
      </Drawer>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Something went wrong, {error.message}</div>
      ) : (
        <MTable data={lists} columns={columns} options={paginationOptions} />
      )}
    </div>
  );
}

export default Inventory;
