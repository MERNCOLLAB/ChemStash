// import MUIDataTable from 'mui-datatables';
import { createTheme } from '@mui/material/styles';
import { GoGear } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { GoLink } from 'react-icons/go';
import { MdDeleteOutline } from 'react-icons/md';
import Drawer from '../ui/Drawer';
import { UpdateChemicalForm, DeleteChemicalForm } from '../ui';
import { MTable } from '../components';

// Hooks
import useDrawer from '../hooks/useDrawer';
import useFormatFormula from '../hooks/useFormatFormula';
import useGetChemical from '../api/useGetChemical';

function Inventory() {
  const { lists, loading, error } = useGetChemical();
  const { currentItem, drawerType, drawerOpen, handleUpdate, handleDelete, handleDrawerClose } = useDrawer(lists);

  const { parseInput } = useFormatFormula();

  const deleteChemical = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/chemical/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      setLoading(false);
      if (data.success === false) {
        return;
      }

      fetchList();
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateItem = async (currentItem) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/chemical/update/${currentItem._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(currentItem),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        return;
      }

      fetchList();
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const renderFormula = (formula) => {
    return formula.map((element, index) =>
      element.isSub ? <sub key={index}>{element.text}</sub> : <span key={index}>{element.text}</span>
    );
  };
  const columns = [
    {
      name: 'name',
    },

    {
      name: 'molecularFormula',
      label: 'Molecular Formula',
      options: { customBodyRender: (value) => renderFormula(parseInput(value)) },
    },

    {
      name: 'lotNumber',
      label: 'Lot Number',
    },

    {
      name: 'purity',
      options: {
        filter: false,
      },
    },
    {
      name: 'location',
      options: {
        customBodyRender: (value) => (
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full text-slate-300   ${
              value === 'Flammable Storage Cabinet'
                ? 'bg-rose-800'
                : value === 'Corrosive Storage Cabinet'
                  ? 'bg-teal-800'
                  : value === 'Refrigerator/Freezer'
                    ? 'bg-sky-800'
                    : value === 'General Storage Shelf'
                      ? 'bg-indigo-800'
                      : value === 'Oxidizer Storage Shelf'
                        ? 'bg-amber-800'
                        : value === 'Gas Cylinder Storage'
                          ? 'bg-slate-800'
                          : 'bg-fuchsia-800'
            }`}
          >
            {value}
          </p>
        ),
      },
    },
    {
      name: 'brand',
      options: {
        filter: false,
      },
    },
    {
      name: 'supply',
    },
    {
      name: 'unit',
    },
    {
      name: 'purchaseDate',
      label: 'Purchase Date',
    },
    {
      name: 'expiryDate',
      label: 'Expiry Date',
    },
    {
      name: 'status',
    },
    {
      name: 'hazardClassification',
      label: 'Hazards',
    },
    {
      name: 'sds',
      options: {
        customBodyRender: (value) => (
          <div className="btn btn-sm  bg-slate-800 hover:bg-slate-700">
            <a href={value}>
              <GoLink />
            </a>
          </div>
        ),
        filter: false,
      },
    },
    {
      name: 'remarks',
      options: {
        filter: false,
      },
    },
    {
      name: '_id',
      label: 'Action',
      options: {
        customBodyRender: (value) => (
          <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="btn btn-sm  bg-slate-800 hover:bg-slate-700 ">
              <GoGear />
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu   shadow bg-slate-800 rounded-box w-52">
              <li className="flex gap-2 hover:bg-slate-700">
                <p
                  onClick={() => {
                    handleUpdate(value);
                  }}
                >
                  <span>
                    <CiEdit />
                  </span>
                  <span>Edit </span>
                </p>
              </li>
              <li className="flex gap-2 hover:bg-slate-700">
                <p
                  onClick={() => {
                    handleDelete(value);
                  }}
                >
                  <span>
                    <MdDeleteOutline />
                  </span>
                  <span>Delete</span>
                </p>
              </li>
            </ul>
          </div>
        ),

        filter: false,
      },
    },
  ];

  const options = {
    selectableRows: 'none',
    elevation: 0,
    rowsPerPage: 12,
    rowsPerPageOptions: [12, 20, 30],
  };

  const getMuiTheme = () =>
    createTheme({
      palette: {
        background: {
          paper: '#0f172a',
          default: '#ffffff',
        },
        mode: 'dark',
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: '0px 3px',
              color: '#94a3b8',
            },
            body: {
              padding: ' 8px',
              color: '#94a3b8',
              fontSize: '12px',
            },
          },
        },
        MUIDataTableFilter: {
          styleOverrides: {
            root: {
              backgroundColor: '#1e293b',
            },
          },
        },

        MuiFormControl: {
          styleOverrides: {
            root: {
              padding: '10px',
            },
          },
        },
        MUIDataTable: {
          styleOverrides: {
            root: {
              border: '1px solid #fff',
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            data: {
              whiteSpace: 'pre',
            },
          },
        },
      },
    });

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
        <MTable className="text-slate-300 " data={lists} columns={columns} options={options} />
      )}
    </div>
  );
}

export default Inventory;
