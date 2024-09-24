import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/InvoiceDetails.css';

const InvoiceDetails = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/invoices/${id}`)
      .then(response => setInvoice(response.data))
      .catch(error => console.error('Error fetching invoice:', error));
  }, [id]);

  if (!invoice) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col-8">
          <h1 className="mb-0">Invoice</h1>
          <small>Invoice Number: {invoice.invoiceNumber}</small>
        </div>
        <div className="col-4 text-end">
          <img src="/api/placeholder/200/100" alt="Company Logo" className="img-fluid" />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-6">
          <h5>To:</h5>
          <p className="mb-1">{invoice.customer.firstName} {invoice.customer.lastName}</p>
          <p className="mb-1">{invoice.customer.address.street}, {invoice.customer.address.zip} {invoice.customer.address.city}</p>
          <p>Phone: {invoice.customer.phone}</p>
        </div>
        <div className="col-6 text-end">
          <h5>From:</h5>
          <p className="mb-1">Your Company Name</p>
          <p className="mb-1">123 Business St</p>
          <p className="mb-1">City, State 12345</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-6">
          <p className="mb-1"><strong>Invoice Date:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
          <p><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</p>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Position</th>
            <th>Description</th>
            <th className="text-end">Quantity</th>
            <th className="text-end">Price</th>
            <th className="text-end">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.positions.map((position, index) => (
            <tr key={index}>
              <td>{position.position}</td>
              <td>{position.description}</td>
              <td className="text-end">{position.quantity}</td>
              <td className="text-end">${position.price.toFixed(2)}</td>
              <td className="text-end">${position.totalPrice.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="text-end"><strong>Total Amount:</strong></td>
            <td className="text-end"><strong>${invoice.totalAmount.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>

      <div className="row mt-4">
        <div className="col-12">
          <p><strong>Payment Terms:</strong> Due within 30 days</p>
          <p><strong>Notes:</strong> Thank you for your business!</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;