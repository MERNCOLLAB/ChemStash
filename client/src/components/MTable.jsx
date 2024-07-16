import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from './Button';

const CustomToolbar = ({ handleAdd }) => {
  return (
    <Button variant="primary" onClick={handleAdd}>
      Add chemical
    </Button>
  );
};

const MTable = ({ data, columns, options, title, handleAdd }) => {
  const getMuiTheme = () =>
    createTheme({
      palette: {
        background: {
          paper: '#E2E8F0',
          default: '#64748B',
        },
        mode: 'light',
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: '10px 14px',
              color: '#F8FAFC',
            },
            body: {
              padding: '10px 14px',
              backgroundColor: '#F8FAFC',
              color: '#64748B',
              fontSize: '12px',
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
            data: {
              whiteSpace: 'pre',
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
        <h1 className="font-semibold pb-4">Chemical Inventory Table</h1>
        <MUIDataTable title={title} data={data} columns={columns} options={customOptions} />
      </div>
    </ThemeProvider>
  );
};

export default MTable;
