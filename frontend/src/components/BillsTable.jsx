/* eslint-disable react/prop-types */
// src/components/BillsTable.jsx
import './BillsTable.css';

const BillsTable = ({ bills }) => {
  return (
    <div className="table-wrapper">
      <table className="bills-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bill</th>
            <th>Supporters</th>
            <th>Opposers</th>
            <th>Primary Sponsor</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(bills).map((billId) => {
            const bill = bills[billId];
            return (
              <tr key={billId}>
                <td>{bill.ID}</td>
                <td>{bill.Bill}</td>
                <td>{bill.Supporters}</td>
                <td>{bill.Opposers}</td>
                <td>{bill['Primary Sponsor']}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BillsTable;
