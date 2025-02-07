/* eslint-disable react/prop-types */
// src/components/LegislatorsTable.jsx
import './LegislatorsTable.css';

const LegislatorsTable = ({ legislators }) => {
  return (
    <div className="table-wrapper">
      <table className="legislators-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Legislator</th>
            <th>Supported Bills</th>
            <th>Opposed Bills</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(legislators).map((legId) => {
            const legislator = legislators[legId];
            return (
              <tr key={legId}>
                <td>{legislator.ID}</td>
                <td>{legislator.Legislator}</td>
                <td>{legislator['Supported bills']}</td>
                <td>{legislator['Opposed bills']}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LegislatorsTable;
