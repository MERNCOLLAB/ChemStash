import { Button } from '../components';
import { ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function DeleteChemicalForm({ item, onDelete, getMuiTheme }) {
  return (
    <div className="menu p-4 w-[49%] min-h-full text-base-content bg-white0">
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

            {/* Batch */}
            <TableRow>
              <TableCell>Batch</TableCell>
              <TableCell>{item.batch}</TableCell>
            </TableRow>

            {/* Molecular Formula */}
            <TableRow>
              <TableCell>Molecular Formula</TableCell>
              <TableCell>{item.molecularFormula}</TableCell>
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

            {/* Supply */}
            <TableRow>
              <TableCell>Supply</TableCell>
              <TableCell>{item.supply}</TableCell>
            </TableRow>

            {/* Amount  */}
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>
                {item.amount} &nbsp; {item.unit}
              </TableCell>
            </TableRow>

            {/* Date Received */}
            <TableRow>
              <TableCell>Date Received</TableCell>
              <TableCell>{item.dateReceived}</TableCell>
            </TableRow>

            {/* Expiry Date */}
            <TableRow>
              <TableCell>Expiry Date</TableCell>
              <TableCell>{item.expiryDate}</TableCell>
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
          <Button type="button" variant="secondary" onClick={() => onDelete(item._id)}>
            Delete
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default DeleteChemicalForm;
