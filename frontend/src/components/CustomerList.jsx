import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerList = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [customers, setCustomers] = useState([]);
  const [sortColumn, setSortColumn] = useState('lastName');
  const [sortDirection, setSortDirection] = useState('asc');

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${backendUrl}/api/customers`)
      .then(response => setCustomers(response.data))
      .catch(error => console.error(error));
  }, [backendUrl]);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    let valueA, valueB;

    if (sortColumn === 'firstName' || sortColumn === 'lastName') {
      valueA = a[sortColumn];
      valueB = b[sortColumn];
    } else {
      valueA = a.address[sortColumn];
      valueB = b.address[sortColumn];
    }

    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleUpdate = (id) => {
    navigate(`/customers/${id}/edit`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      axios.delete(`${backendUrl}/api/customers/${id}`)
        .then(response => {
          console.log('Customer deleted:', response.status);
          setCustomers(prevDetails => prevDetails.filter(customer => customer.id !== id)); // Remove deleted customer from state
        })
        .catch(error => {
          console.error('Error deleting customer:', error);
          alert('Error deleting customer. Please try again.');
        });
    }
  };  

  return (
    <div className="card">
      <div className="card-header">
        <h2>Kundenübersicht</h2>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => handleSort('firstName')}>
                Vorname {sortColumn === 'firstName' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('lastName')}>
                Nachname {sortColumn === 'lastName' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('street')}>
                Straße {sortColumn === 'street' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('zip')}>
                PLZ {sortColumn === 'zip' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('city')}>
                Stadt {sortColumn === 'city' && (sortDirection === 'asc' ? '▲' : '▼')}
              </th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {sortedCustomers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.address.street}</td>
                <td>{customer.address.zip}</td>
                <td>{customer.address.city}</td>
                <td className="d-grid gap-1 d-lg-flex">
                  <button onClick={() => handleUpdate(customer.id)} className="btn btn-primary">Updaten</button>
                  <button onClick={() => handleDelete(customer.id)} className="btn btn-danger">Löschen</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
