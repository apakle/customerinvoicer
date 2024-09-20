import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');

  // Fetch all invoices initially
  useEffect(() => {
    axios.get('http://localhost:8080/api/invoices')
      .then(response => {
        const invoices = response.data;
        setInvoices(invoices);
        setFilteredInvoices(invoices); // Initialize with all invoices
        // Extract unique years from invoices
        const years = [...new Set(invoices.map(invoice => new Date(invoice.date).getFullYear()))];
        setAvailableYears(years);
      })
      .catch(error => console.error(error));
  }, []);

  // Handle filtering invoices by year
  useEffect(() => {
    if (selectedYear === 'all') {
      setFilteredInvoices(invoices); // Show all invoices
    } else {
      const filtered = invoices.filter(invoice => new Date(invoice.date).getFullYear() === parseInt(selectedYear));
      setFilteredInvoices(filtered);
    }
  }, [selectedYear, invoices]);

  return (
    <div>
      <h2>Invoice List</h2>

      {/* Dropdown for selecting the year */}
      <div>
        <label htmlFor="year-filter">Filter by Year: </label>
        <select
          id="year-filter"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="all">All Invoices</option>
          {availableYears.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {filteredInvoices.map(invoice => (
          <li key={invoice.id}>
            {invoice.invoiceNumber} - {new Date(invoice.date).toLocaleDateString()} - Total: {invoice.totalAmount} - {' '}
            <Link to={`/invoices/${invoice.id}`}>
              Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
