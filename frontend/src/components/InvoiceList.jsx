import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InvoiceList = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [availableCustomers, setAvailableCustomers] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState('all');
  const [sortColumn, setSortColumn] = useState('invoiceNumber');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    axios.get(`${backendUrl}/api/invoices`)
      .then(response => {
        const invoices = response.data;
        setInvoices(invoices);
        setFilteredInvoices(invoices);
        
        // Set available years for filtering
        const years = [...new Set(invoices.map(invoice => new Date(invoice.invoiceDate).getFullYear()))];
        setAvailableYears(years.sort((a, b) => a - b));
        
        // Set available customers for filtering
        const customers = [...new Set(invoices.map(invoice => `${invoice.customer.firstName} ${invoice.customer.lastName}`))];
        setAvailableCustomers(customers.sort());
      })
      .catch(error => console.error(error));
  }, [backendUrl]);

  useEffect(() => {
    let filtered = invoices;

    // Filter by year
    if (selectedYear !== 'all') {
      filtered = filtered.filter(invoice => new Date(invoice.invoiceDate).getFullYear() === parseInt(selectedYear));
    }

    // Filter by customer
    if (selectedCustomer !== 'all') {
      filtered = filtered.filter(invoice => 
        `${invoice.customer.firstName} ${invoice.customer.lastName}` === selectedCustomer
      );
    }

    setFilteredInvoices(filtered);
  }, [selectedYear, selectedCustomer, invoices]);

  // Sorting function
  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Sorting logic
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    let valueA, valueB;

    switch (sortColumn) {
      case 'invoiceNumber':
        valueA = a.invoiceNumber;
        valueB = b.invoiceNumber;
        break;
      case 'customer':
        valueA = `${a.customer.firstName} ${a.customer.lastName}`;
        valueB = `${b.customer.firstName} ${b.customer.lastName}`;
        break;
      case 'serviceDate':
        valueA = new Date(a.serviceDate);
        valueB = new Date(b.serviceDate);
        break;
      case 'invoiceDate':
        valueA = new Date(a.invoiceDate);
        valueB = new Date(b.invoiceDate);
        break;
      case 'totalAmount':
        valueA = a.totalAmount;
        valueB = b.totalAmount;
        break;
      default:
        return 0;
    }

    if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="card">
      <div className="card-header">
        <h2>Übersicht Rechnungen</h2>
      </div>
      <div className="card-body">
        <div className="d-flex gap-3 mb-3">
          <div>
            <label htmlFor="year-filter" className="form-label">Nach Jahr filtern</label>
            <select
              id="year-filter"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="form-select"
            >
              <option value="all">Alle</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="customer-filter" className="form-label">Nach Kunde filtern</label>
            <select
              id="customer-filter"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="form-select"
            >
              <option value="all">Alle</option>
              {availableCustomers.map(customer => (
                <option key={customer} value={customer}>{customer}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => handleSort('invoiceNumber')}>
                  Re-Nr. {sortColumn === 'invoiceNumber' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('customer')}>
                  Kunde {sortColumn === 'customer' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('serviceDate')}>
                  Leistungsdatum {sortColumn === 'serviceDate' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('invoiceDate')}>
                  Rechnungsdatum {sortColumn === 'invoiceDate' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th onClick={() => handleSort('totalAmount')}>
                  Rechnungsbetrag {sortColumn === 'totalAmount' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedInvoices.map(invoice => (
                <tr key={invoice.id}>
                  <td>
                    <Link to={`/invoices/${invoice.id}`} className="btn btn-link">
                      {invoice.invoiceNumber}
                    </Link>
                  </td>
                  <td>{invoice.customer.firstName} {invoice.customer.lastName}</td>
                  <td>{new Date(invoice.serviceDate).toLocaleDateString()}</td>
                  <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                  <td>{invoice.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
