import { useEffect } from "react";
import { useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoGear } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import Drawer from "../ui/Drawer";

function Inventory() {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [itemDelete, setItemToDelete] = useState([]);
  // const columns = [
  //   "name",
  //   "casNumber",
  //   "molecularFormula",
  //   "purity",
  //   "location",
  //   "supplier",
  // ];

  const handleDelete = (id) => {
    const itemToDelete = lists.find((item) => item._id === id);
    setItemToDelete(itemToDelete);

    toggleDrawer();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/chemical/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setLists(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const deleteChemical = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/chemical/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      toggleDrawer();
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

  const columns = [
    {
      name: "name",
    },
    {
      name: "casNumber",
    },
    {
      name: "molecularFormula",
    },
    {
      name: "purity",
    },
    {
      name: "location",
      options: {
        customBodyRender: (value) => (
          <p
            className={`capitalize px-3 py-1 inline-block rounded-full text-slate-950 ${
              value === "A1"
                ? "bg-sky-500"
                : value === "B1"
                ? "bg-amber-500"
                : value === "C1"
                ? "bg-emerald-500"
                : value === "D1"
                ? "bg-indigo-500"
                : "bg-rose-500"
            }`}
          >
            {value}
          </p>
        ),
      },
    },
    {
      name: "supplier",
    },
    {
      name: "_id",
      label: "Action",
      options: {
        customBodyRender: (value) => (
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-sm  bg-slate-800 hover:bg-slate-700 "
            >
              <GoGear />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu   shadow bg-slate-800 rounded-box w-52"
            >
              <li className="flex gap-2">
                <p>
                  <span>
                    <CiEdit />
                  </span>
                  <span>Edit </span>
                </p>
              </li>
              <li>
                <p onClick={() => handleDelete(value)}>
                  <span>
                    <MdDeleteOutline />
                  </span>
                  <span>Delete</span>
                </p>
              </li>
            </ul>
          </div>
        ),
      },
    },
  ];

  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 12,
    rowsPerPageOptions: [12, 20, 30],
  };

  const getMuiTheme = () =>
    createTheme({
      palette: {
        background: {
          paper: "#0f172a",
          default: "#ffffff",
        },
        mode: "dark",
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: "10px 3px",
              color: "#94a3b8",
            },
            body: {
              padding: "5px 15px",
              color: "#94a3b8",
            },
          },
        },
        MUIDataTableFilter: {
          styleOverrides: {
            root: {
              backgroundColor: "#1e293b",
            },
          },
        },

        MuiFormControl: {
          styleOverrides: {
            root: {
              padding: "10px",
            },
          },
        },
        MUIDataTable: {
          styleOverrides: {
            root: {
              border: "1px solid #fff",
            },
          },
        },
      },
    });

  return (
    <div className="flex flex-col  ">
      <Drawer
        isOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        itemDelete={itemDelete}
        deleteItem={deleteChemical}
      />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Something went wrong, {error.message}</div>
      ) : (
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            className="text-slate-300 "
            title={"Chemical List"}
            data={lists}
            columns={columns}
            options={options}
          />
        </ThemeProvider>
      )}
    </div>
  );
}

export default Inventory;
