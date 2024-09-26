import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [availableCustomers, setAvailableCustomers] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:8080/api/invoices')
      .then(response => {
        const invoices = response.data;
        setInvoices(invoices);
        setFilteredInvoices(invoices);
        
        // Set available years for filtering
        const years = [...new Set(invoices.map(invoice => new Date(invoice.invoiceDate).getFullYear()))];
        setAvailableYears(years);
        
        // Set available customers for filtering
        const customers = [...new Set(invoices.map(invoice => `${invoice.customer.firstName} ${invoice.customer.lastName}`))];
        setAvailableCustomers(customers);
      })
      .catch(error => console.error(error));
  }, []);

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

  return (
    <div className="card">
      <div className="card-header">
        <h2>Invoice List</h2>
      </div>
      <div className="card-body">
        <div className="d-flex gap-3 mb-3">
          <div>
            <label htmlFor="year-filter" className="form-label">Filter by Year</label>
            <select
              id="year-filter"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="form-select"
            >
              <option value="all">All Invoices</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="customer-filter" className="form-label">Filter by Customer</label>
            <select
              id="customer-filter"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="form-select"
            >
              <option value="all">All Customers</option>
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
                <th>Invoice Number</th>
                <th>Kunde</th>
                <th>Leistungsdatum</th>
                <th>Rechnungsdatum</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(invoice => (
                <tr key={invoice.id}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.customer.firstName} {invoice.customer.lastName}</td>
                  <td>{new Date(invoice.serviceDate).toLocaleDateString()}</td>
                  <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                  <td>{invoice.totalAmount}</td>
                  <td>
                    <Link to={`/invoices/${invoice.id}`} className="btn btn-link">
                      Details
                    </Link>
                  </td>
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
