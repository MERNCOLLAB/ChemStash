import FormatFormula from '../helpers/FormatFormula';
import { ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function DeleteChemicalForm({ item, onDelete, getMuiTheme }) {
  return (
    <div className="menu p-4 w-80 min-h-full text-base-content bg-slate-800">
      <ThemeProvider theme={getMuiTheme()}>
        <Table sx={{ minWidth: 80 }} size="small" aria-label="delete drawer">
          <TableHead>
            <TableRow>
              <TableCell className="indent-1">List</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Name */}
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>

            {/* Molecular Formula */}
            <TableRow>
              <TableCell>Molecular Formula</TableCell>
              <TableCell>
                <FormatFormula formula={item.molecularFormula} />
              </TableCell>
            </TableRow>

            {/*Lot Number */}
            <TableRow>
              <TableCell>Lot Number</TableCell>
              <TableCell>{item.lotNumber}</TableCell>
            </TableRow>

            {/* Purity */}
            <TableRow>
              <TableCell>Purity</TableCell>
              <TableCell>{item.purity}</TableCell>
            </TableRow>

            {/* Location */}
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell>{item.location}</TableCell>
            </TableRow>

            {/* Brand */}
            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>{item.brand}</TableCell>
            </TableRow>

            {/* Supply  */}
            <TableRow>
              <TableCell>Supply</TableCell>
              <TableCell>
                {item.supply} &nbsp; {item.unit}
              </TableCell>
            </TableRow>

            {/* Purchase Date */}
            <TableRow>
              <TableCell>Purchase Date</TableCell>
              <TableCell>{item.purchaseDate}</TableCell>
            </TableRow>

            {/* Expiry Date */}
            <TableRow>
              <TableCell>Expiry Date</TableCell>
              <TableCell>{item.expiryDate}</TableCell>
            </TableRow>

            {/* Status */}
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>

            {/* Hazard Classification */}
            <TableRow>
              <TableCell>Hazards</TableCell>
              <TableCell>{item.hazardClassification}</TableCell>
            </TableRow>

            {/* Remarks */}
            <TableRow>
              <TableCell>Remarks</TableCell>
              <TableCell>{item.remarks}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-2 text-center">
          <button type="button" className="btn bg-rose-600 mt-4" onClick={() => onDelete(item._id)}>
            Delete
          </button>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default DeleteChemicalForm;
