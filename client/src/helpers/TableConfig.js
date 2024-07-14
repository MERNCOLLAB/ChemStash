import { createTheme } from '@mui/material/styles';

export const paginationOptions = {
  selectableRows: 'none',
  elevation: 0,
  rowsPerPage: 12,
  rowsPerPageOptions: [12, 20, 30],
};

export const getMuiTheme = () =>
  createTheme({
    palette: {
      background: {
        paper: '#64748B',
        default: '#ffffff',
      },
      mode: 'light',
    },
    components: {
      MuiTableHeadCell: {
        styleOverrides: {
          head: {
            padding: '0px 3px',
            color: '#64748B',
          },
          body: {
            padding: ' 8px',
            color: '#64748B',
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
