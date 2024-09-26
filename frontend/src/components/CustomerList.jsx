import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get(`${backendUrl}/api/customers`)
      .then(response => setCustomers(response.data))
      .catch(error => console.error(error));
  }, [backendUrl]);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Customer List</h2>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Street</th>
              <th>ZIP</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.address.street}</td>
                <td>{customer.address.zip}</td>
                <td>{customer.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
