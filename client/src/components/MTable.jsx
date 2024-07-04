import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const MTable = ({ data, columns, options, title }) => {
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
              padding: '8px',
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

  if (!data) return;
  return (
    <ThemeProvider theme={getMuiTheme()}>
      <MUIDataTable className="text-slate-300" title={title} data={data} columns={columns} options={options} />
    </ThemeProvider>
  );
};

export default MTable;
