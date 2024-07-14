import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Button from './Button';

const CustomToolbar = () => {
  const handleClick = () => {
    // Need to link at add Chemical Drawer
    return;
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      Add chemical
    </Button>
  );
};

const MTable = ({ data, columns, options, title }) => {
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
        MUIDataTableHeadCell: {
          styleOverrides: {
            data: {
              whiteSpace: 'pre',
              color: '#64748B',
            },
          },
        },
      },
    });

  const customOptions = {
    ...options,
    customToolbar: () => <CustomToolbar />,
  };

  if (!data) return null;
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <MUIDataTable title={title} data={data} columns={columns} options={customOptions} />
    </ThemeProvider>
  );
};

export default MTable;
