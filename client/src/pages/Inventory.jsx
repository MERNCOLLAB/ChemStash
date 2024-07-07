// Components
import Drawer from '../ui/Drawer';
import { useState, useEffect } from 'react';
import { UpdateChemicalForm, DeleteChemicalForm } from '../ui';
import { MTable } from '../components';

// Table Configurations
import useFormatFormula from '../hooks/useFormatFormula';
import { inventoryColumns } from '../configs/InventoryColumn';
import { paginationOptions, getMuiTheme } from '../helpers/TableConfig';

// Hooks
import useDrawer from '../hooks/useDrawer';
import useGetChemical from '../api/useGetChemical';
import useUpdateChemical from '../api/useUpdateChemical';
import useDeleteChemical from '../api/useDeleteChemical';

function Inventory() {
  const [lists, setLists] = useState([]);
  const { getChemicalList, loading, error } = useGetChemical(lists, setLists);
  const { currentItem, drawerType, drawerOpen, handleUpdate, handleDelete, handleDrawerClose } = useDrawer(lists);
  const { updateItem } = useUpdateChemical(getChemicalList, handleDrawerClose);
  const { deleteChemical } = useDeleteChemical(getChemicalList, handleDrawerClose);

  const { parseInput } = useFormatFormula();
  const renderFormula = (formula) => {
    return formula.map((element, index) =>
      element.isSub ? <sub key={index}>{element.text}</sub> : <span key={index}>{element.text}</span>
    );
  };
  const columns = inventoryColumns(handleUpdate, handleDelete, parseInput, renderFormula);

  useEffect(() => {
    getChemicalList();
  }, []);

  return (
    <div className="flex flex-col  ">
      <Drawer isOpen={drawerOpen} onClose={handleDrawerClose}>
        {drawerType === 'update' ? (
          <UpdateChemicalForm item={currentItem} handleUpdate={updateItem} />
        ) : drawerType === 'delete' ? (
          <DeleteChemicalForm item={currentItem} onDelete={deleteChemical} getMuiTheme={getMuiTheme} />
        ) : null}
      </Drawer>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Something went wrong, {error.message}</div>
      ) : (
        <MTable className="text-slate-300 " data={lists} columns={columns} options={paginationOptions} />
      )}
    </div>
  );
}

export default Inventory;
