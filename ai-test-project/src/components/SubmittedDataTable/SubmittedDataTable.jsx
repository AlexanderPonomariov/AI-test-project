import React from 'react';
import { useSelector } from 'react-redux';

function SubmittedDataTable() {
  const submittedData = useSelector((state) => state.contact.submittedData);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      { !!Object.keys(submittedData).length && (
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{submittedData.firstName}</td>
            <td>{submittedData.lastName}</td>
            <td>{submittedData.email}</td>
            <td>{submittedData.message}</td>
          </tr>
        </tbody>
      </table>
      )}
    </>
  );
}

export default SubmittedDataTable;
