import { useNavigate } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Button from './Button';

const CustomToolbar = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleNavigateAddChemical = () => {
    if (currentUser.role === 'chemist') {
      return;
    }
    navigate(`/${currentUser.role}/chemical`);
  };

  return (
    <Button variant="primary" onClick={handleNavigateAddChemical}>
      Add chemical
    </Button>
  );
};

const MTable = ({ data, columns, options, title, currentUser }) => {
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
    customToolbar: () => <CustomToolbar currentUser={currentUser} />,
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
