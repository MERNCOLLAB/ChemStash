import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from './Button';
import ToastProvider from '../configs/ToastProvider';
import useGetChemical from '../api/chemical/useGetChemical';

const CustomToolbar = ({ handleAdd }) => {
  return (
    <Button variant="primary" onClick={handleAdd}>
      Add chemical
    </Button>
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
        MuiTableCell: {
          styleOverrides: {
            head: {
              color: '#F8FAFC',
            },
            body: {
              textAlign: 'left',
              minWidth: '175px',
              backgroundColor: '#F8FAFC',
              color: '#64748B',
              fontSize: '16px',
            },
          },
        },
        MUIDataTableFilter: {
          styleOverrides: {
            root: {
              backgroundColor: '#F8FAFC',
              fontSize: '16px',
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
              whiteSpace: 'pre',
              fontWeight: '600',
              color: '#64748B',
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
            root: {
              backgroundColor: '#F1F5F9',
            },
            gutters: {
              backgroundColor: '#E2E8F0',
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
      <div className="p-8">
        <h1 className="font-semibold text-xl pb-2">Chemical Inventory Table</h1>
        <ToastProvider toastType={toastType} toastMessage={toastMessage} clearToast={clearToast} />
        <MUIDataTable title={title} data={data} columns={columns} options={customOptions} />
      </div>
    </ThemeProvider>
  );
};

export default MTable;
