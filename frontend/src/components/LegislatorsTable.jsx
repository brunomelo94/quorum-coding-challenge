/* eslint-disable react/prop-types */
// src/components/LegislatorsTable.jsx
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

const LegislatorsTable = ({ legislators, columns }) => {
  // Convert the legislators object to an array
  const legislatorArray = Object.values(legislators);

  // Determine which columns to display.
  // If a "columns" prop is provided, use it; otherwise, derive columns from the first legislator.
  const tableColumns =
    columns ||
    (legislatorArray.length > 0
      ? Object.keys(legislatorArray[0])
      : ['ID', 'Legislator', 'Supported bills', 'Opposed bills']);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="legislators table">
        <TableHead>
        <TableRow sx={{ backgroundColor: '#23ab20' }}>
            {tableColumns.map((col) => (
              <TableCell
                key={col}
                sx={{
                  fontWeight: 'bold',
                  color: (theme) => theme.palette.common.white,
                }}
              >
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {legislatorArray.map((legislator, index) => (
            <TableRow
              key={legislator.ID || index}
              sx={{
                // Alternate row color for better readability
                '&:nth-of-type(odd)': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
                // Change row color on hover for interactivity
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.selected,
                },
              }}
            >
              {tableColumns.map((col) => (
                <TableCell key={col}>{legislator[col]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LegislatorsTable;
