import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:8080/api/invoices')
      .then(response => {
        const invoices = response.data;
        setInvoices(invoices);
        setFilteredInvoices(invoices);
        const years = [...new Set(invoices.map(invoice => new Date(invoice.date).getFullYear()))];
        setAvailableYears(years);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedYear === 'all') {
      setFilteredInvoices(invoices);
    } else {
      const filtered = invoices.filter(invoice => new Date(invoice.date).getFullYear() === parseInt(selectedYear));
      setFilteredInvoices(filtered);
    }
  }, [selectedYear, invoices]);

  return (
    <div>
      <h2 className="mb-3">Invoice List</h2>
      <div className="mb-3">
        <label htmlFor="year-filter" className="form-label">Filter by Year</label>
        <select
          id="year-filter"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="form-select w-auto"
        >
          <option value="all">All Invoices</option>
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <ul className="list-group">
        {filteredInvoices.map(invoice => (
          <li key={invoice.id} className="list-group-item">
            {invoice.invoiceNumber} - {new Date(invoice.date).toLocaleDateString()} - Total: {invoice.totalAmount} - {' '}
            <Link to={`/invoices/${invoice.id}`} className="btn btn-link">
              Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
