import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Button from './Button';
import ToastProvider from '../configs/ToastProvider';
import useGetChemical from '../api/chemical/useGetChemical';

const CustomToolbar = ({ handleAdd }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
  <>
    {  currentUser.role === 'manager' || currentUser.role === 'tl' ?  
    <Button variant="primary" onClick={handleAdd}>
      Add chemical
    </Button> 
  : null}
  </>
  );
};

const MTable = ({ data, columns, options, title, handleAdd }) => {
  const { toastMessage, toastType, clearToast } = useGetChemical();
  const getMuiTheme = () =>
    createTheme({
      palette: {
        background: {
          paper: '#E2E8F0',
        },
        mode: 'light',
      },
      components: {
        MuiTable:{
          styleOverrides:{
            root:{
              width:'100vw',
            }
          }
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              fontFamily: 'Poppins',
            },

            head: {
              color: '#F8FAFC',
            },
            body: {
              textAlign: 'left',
              padding: '4px 8px',
              backgroundColor: '#F8FAFC',

              color: '#94A3B8',
              fontSize: '12px',
              // border: '1px solid #E3E7EF',
            },
            footer: {
              padding: '8px',
            },
          },
        },

        MUIDataTableFilter: {
          styleOverrides: {
            root: {
              backgroundColor: '#F8FAFC',
              fontSize: '12px',
              color: '#64748B',
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
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              backgroundColor: '#E2E8F0',
            },
            data: {
              color: '#64748B',
              fontSize: '12px',
              fontFamily: 'Poppins',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: '8px',
              overflow: 'hidden',
            },
          },
        },
        MuiToolbar: {
          styleOverrides: {
            gutters: {
              backgroundColor: '#F2F5F9',
              fontFamily: 'Poppins',
            },
          },
        },

        MuiButtonBase: {
          styleOverrides: {
            root: {
              justifyContent: 'left',
            },
          },
        },
        MuiTablePagination: {
          styleOverrides: {
            root: {},

            toolbar: {
              background: '#E3E7F0',
              color: '#64748B',
            },
            selectLabel: {
              fontFamily: 'Poppins',
              fontWeight: '600',
            },
            input: {
              fontFamily: 'Poppins',
              fontWeight: '600',
            },
            displayedRows: {
              fontFamily: 'Poppins',
              fontWeight: '600',
            },
            actions: {
              fontFamily: 'Poppins',
              fontWeight: '600',
            },
          },
        },
      },
    });

  const customOptions = {
    ...options,
    customToolbar: () => <CustomToolbar handleAdd={handleAdd} />,
  };

  if (!data) return null;
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <div className=" p-2 ">
        <h1 className="font-semibold text-xl pb-2">Chemical Inventory Table</h1>
        <ToastProvider toastType={toastType} toastMessage={toastMessage} clearToast={clearToast} />
        <MUIDataTable title={title} data={data} columns={columns} options={customOptions} />
      </div>
    </ThemeProvider>
  );
};

export default MTable;
