import { useEffect } from "react";
import { useState } from "react";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Inventory() {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // const columns = [
  //   "name",
  //   "casNumber",
  //   "molecularFormula",
  //   "purity",
  //   "location",
  //   "supplier",
  // ];

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
  ];

  useEffect(() => {
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
    fetchList();
  }, []);

  const options = {
    selectableRows: "none",
    elevation: 0,
    rowsPerPage: 15,
    rowsPerPageOptions: [5, 10, 15],
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
    <div className="flex flex-col ">
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
