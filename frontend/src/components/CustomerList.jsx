import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2>Customer List</h2>
      </div>
      <ul className="list-group list-group-flush">
        {customers.map(customer => (
          <li key={customer.id} className="list-group-item">
            {customer.firstName} {customer.lastName}, {customer.address.street}, {customer.address.zip} {customer.address.city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
