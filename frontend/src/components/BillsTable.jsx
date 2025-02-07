/* eslint-disable react/prop-types */
// src/components/BillsTable.jsx
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const BillsTable = ({ bills, columns }) => {
  // Convert the bills object into an array.
  const billArray = Object.values(bills);

  // Determine which columns to display.
  // If a "columns" prop is provided, use it; otherwise, derive columns from the first bill.
  const tableColumns =
    columns || (billArray.length > 0 ? Object.keys(billArray[0]) : []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="bills table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#cc701f' }}>
            {tableColumns.map((col) => (
              <TableCell key={col} sx={{ fontWeight: 'bold', color: 'white' }}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {billArray.map((bill, index) => (
            <TableRow
              key={bill.ID || index}
              sx={{
                // Zebra striping: alternate background color for odd rows.
                '&:nth-of-type(odd)': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
                // Hover effect for interactivity.
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.selected,
                },
              }}
            >
              {tableColumns.map((col) => (
                <TableCell key={col}>{bill[col]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BillsTable;
